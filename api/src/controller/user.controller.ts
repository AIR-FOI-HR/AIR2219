import express, { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { check } from 'express-validator';
import { User } from '../model/entity/User';
import { UserResponse } from '../model/response/UserResponse';
import * as userService from '../service/user.service';
import { AppError } from '../model/constants/AppError';
import { authenticateRequest } from '../middleware/auth';

const router = express.Router();

router.use(authenticateRequest);

router.post(
  '',
  [
    check("firstName").notEmpty(),
    check("lastName").notEmpty(),
    check("email").isEmail(),
    check("phone").notEmpty(),
    check("password").isLength({ min: 8 })
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new AppError("Invalid user data!", 422));
    }

    userService.registerUser(req.body);

    res.json({message: 'User created successfully!'});
  }
);

router.get('', async (_, res) => {
    const users: User[] = await userService.getAllUsers();
    res.json(UserResponse.toDtos(users));
});

module.exports = router;
