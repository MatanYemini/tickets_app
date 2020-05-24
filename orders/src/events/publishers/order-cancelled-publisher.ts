import { Publisher, OrderCancelledEvent, Subjects } from '@yemini/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
