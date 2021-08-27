import * as express from "express";
import { body } from "express-validator";
import { sign } from "jsonwebtoken";

import { User } from "../models/user";
import { validateRequest, BadRequestError } from "@ticketappdev/common";
import { Password } from "../services/password";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    const userJWT = sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY
    );

    req.session = {
      jwt: userJWT,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signInRouter };
