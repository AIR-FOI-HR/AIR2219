import express, { NextFunction, Request, Response } from "express";
import { validationResult, check } from "express-validator";
import { User } from "../model/entity/User";
import { UserResponse } from "../model/response/UserResponse";
import * as userService from "../service/user.service";
import { AppError } from "../model/constants/AppError";

const router = express.Router();

router.post(
  "",
  [
    check("firstName").notEmpty(),
    check("lastName").notEmpty(),
    check("email").isEmail(),
    check("phone").notEmpty(),
    check("password").isLength({ min: 8 }),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError("Invalid user data!", 422));
    }

    userService.registerUser(req.body);

    res.json({ message: "User created successfully!" });
  }
);

router.post(
  "/login",
  [check("email").isEmail(), check("password").isLength({ min: 8 })],
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError("Invalid user data!", 422));
    }

    let loginResponse;
    try {
      loginResponse = await userService.loginUser(req.body);
    } catch (error) {
      const errorMessage = error instanceof AppError ? error.message : "User login failed!";
      const errorCode = error instanceof AppError ? error.code : 500;
      return next(new AppError(errorMessage, errorCode));
    }

    res.json(loginResponse);
  }
);

router.get("", async (_, res) => {
  const users: User[] = await userService.getAllUsers();
  res.json(UserResponse.toDtos(users));
});

module.exports = router;
