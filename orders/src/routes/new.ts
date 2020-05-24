import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  DatabaseConnectionError,
  OrderStatus,
  BadRequestError,
} from '@yemini/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

router.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => {
        mongoose.Types.ObjectId.isValid(input);
      })
      .withMessage('TicketId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;
    // find the ticket the user is trying to order in the database
    try {
      const ticket = await Ticket.findById(ticketId);
      if (!ticket) {
        throw new NotFoundError();
      }
      // make sure that the is not already reserved
      // run a query to look on all orders, find and order where the ticket was found and the order stauts is not cancelled

      const isReserved = await ticket.isReserved();

      if (isReserved) {
        throw new BadRequestError('The ticket is already taken');
      }
      // calculate an expiration date for this order
      const expiration = new Date();
      expiration.setSeconds(
        expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS
      );
      // build the order and save it to the database
      const order = Order.build({
        userId: req.currentUser!.id,
        status: OrderStatus.Created,
        expiresAt: expiration,
        ticket,
      });
      await order.save();

      // publish an event saying that the order was created
      new OrderCreatedPublisher(natsWrapper.client).publish({
        id: order.id,
        status: OrderStatus.Created,
        userId: order.userId,
        expiresAt: order.expiresAt.toISOString(),
        ticket: {
          id: ticket.id,
          price: ticket.price,
        },
      });

      res.status(201).send(order);
    } catch (error) {
      throw new DatabaseConnectionError();
    }
  }
);

export { router as newOrderRouter };
