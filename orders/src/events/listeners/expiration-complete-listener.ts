import {
  Listener,
  ExpirationCompleteEvent,
  OrderStatus,
  Subjects,
} from '@yemini/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';
import { OrderCancelledPublisher } from '../publishers/order-cancelled-publisher';

export class ExpirationCompleteListener extends Listener<
  ExpirationCompleteEvent
> {
  queueGroupName = queueGroupName;
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;

  async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
    try {
      const order = await Order.findById(data.orderId);

      if (!order) {
        throw new Error('order not found');
      }

      order.set({
        status: OrderStatus.Cancelled,
      });
      await order.save();
    } catch (error) {
      console.log(error);
    }
  }
}
