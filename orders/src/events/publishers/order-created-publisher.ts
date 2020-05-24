import { Publisher, OrderCreatedEvent, Subjects } from '@yemini/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
