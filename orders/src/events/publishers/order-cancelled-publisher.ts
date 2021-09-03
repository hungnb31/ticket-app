import { Publisher, OrderCancelledEvent, Subjects } from "@ticketappdev/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
