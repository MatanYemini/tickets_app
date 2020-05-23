import { Publisher, OrderCancelledEvent, Subjects } from '@yemini/common';

export class OrderCreatedPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
