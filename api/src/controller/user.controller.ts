import express, { NextFunction, Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import { User } from '../model/entity/User';
import { UserResponse } from '../model/response/UserResponse';
import * as userService from '../service/user.service';
import { AppError } from '../model/constants/AppError';
import { authenticateRequest } from '../auth/auth';
import { AuthRequest } from '../model/request/AuthRequest';

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

router.use(authenticateRequest);

router.get('', async ( req: Request, res: Response, next: NextFunction) => {
    const { isAdmin } = (req as AuthRequest).userData;
    if(!isAdmin) {
      return next(new AppError("Admin privileges are needed to access this route!", 403));
    }
    
    const users: User[] = await userService.getAllUsers();
    res.json(UserResponse.toDtos(users));
});


router.post('/changePassword',
  [
    check("email").notEmpty(),
    check("oldPassword").notEmpty(),
    check("newPassword").notEmpty(),
    check("newPassword").isLength({ min: 8 })
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new AppError("Invalid user data!", 422));
    }

    let { email, oldPassword, newPassword } = req.body;

    try {
      await userService.changeUserPassword(email, oldPassword, newPassword);
    } catch (error) {
      return next(new AppError(error.message, 500))
    }

    res.json({message: 'Password changed successfully!'})
  }

)


module.exports = router;
