import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@yemini/common';
import { Ticket } from '../../models/ticket';
import { QueueGroupName } from './queue-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = QueueGroupName;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { title, price } = data;
    const ticket = Ticket.build({
      title,
      price,
    });
    await ticket.save();

    msg.ack();
  }
}
