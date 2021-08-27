import { Response, Request } from "express";
import * as express from "express";
import { body } from "express-validator";
import { sign } from "jsonwebtoken";

import { validateRequest, BadRequestError } from "@31ff/common";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid!"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password mus be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });
    await user.save();

    const userJWT = sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY
    );

    req.session.jwt = userJWT;

    res.status(201).send(user);
  }
);

export { router as signUpRouter };
