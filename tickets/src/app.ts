import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@ticketappdev/common";

const app = express();

app.set("trust proxy", 1);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(json());

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
