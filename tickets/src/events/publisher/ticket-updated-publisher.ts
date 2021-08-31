import { Publisher, Subjects, TicketUpdatedEvent } from "@ticketappdev/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
