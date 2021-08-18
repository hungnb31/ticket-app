import * as express from "express";
import { json } from "body-parser";

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.get("/api/users/currentuser", (req, res) => {
  res.send("Hi there!");
});

app.listen(3000, () => {
  console.log("Auth Service is listening on port 3000!!!");
});
