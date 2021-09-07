import { Subjects, Publisher, PaymentCreatedEvent } from "@ticketappdev/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
