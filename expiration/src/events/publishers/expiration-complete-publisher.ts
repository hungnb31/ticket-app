import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@ticketappdev/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
