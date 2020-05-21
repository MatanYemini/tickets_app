import { Publisher, TicketUpdatedEvent } from '@yemini/common';
import { Subjects } from '@yemini/common/build/events/subjects';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
