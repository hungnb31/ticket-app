import { Response, Request } from "express";
import * as express from "express";
<<<<<<< HEAD
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
=======
import { body } from "express-validator";
>>>>>>> aa01529254dffbd58d39c0dcbbcb7fe8f542ebc0

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
  (req: Request, res: Response) => {
<<<<<<< HEAD
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;

    console.log("Creating user...");
    throw new DatabaseConnectionError();

    res.send({});
=======
    const { email, password } = req.body;
    res.send("Hi there!");
>>>>>>> aa01529254dffbd58d39c0dcbbcb7fe8f542ebc0
  }
);

export { router as signUpRouter };
