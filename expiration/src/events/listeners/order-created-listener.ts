import { Listener, OrderCreatedEvent, Subjects } from "@ticketappdev/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const expiresMilisecond = new Date(data.expiresAt).getTime(); // get expiresAt in milisecond
    const currentMilisecond = new Date().getTime(); // get current time in milisecond
    const delay = expiresMilisecond - currentMilisecond;

    console.log("Waiting for", delay, "milisecond to process the job");

    await expirationQueue.add(
      { orderId: data.id },
      {
        delay,
      }
    );

    msg.ack();
  }
}
