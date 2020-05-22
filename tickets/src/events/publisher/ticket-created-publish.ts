import { Publisher, TicketCreatedEvent } from '@yemini/common';
import { Subjects } from '@yemini/common/build/events/subjects';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
