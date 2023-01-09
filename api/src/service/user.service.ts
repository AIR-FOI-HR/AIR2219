import { UserCreateRequest } from '../model/request/UserCreateRequest';
import { UserRepository } from '../dao/user.repository';
import { User } from '../model/entity/User';
import * as argon2 from 'argon2';
import { UserLoginRequest } from '../model/request/UserLoginRequest';
import { AppError } from '../model/constants/AppError';
import * as jwt from 'jsonwebtoken';
import { UserRole } from '../model/constants/UserRole';
import { UserLoginResponse } from '../model/response/UserLoginResponse';

export const registerUser = async (userCreateRequest: UserCreateRequest) => {
  const hashedPassword = await argon2.hash(userCreateRequest.password);
  const newUser: User = UserCreateRequest.toEntity(
    userCreateRequest,
    hashedPassword
  );
  UserRepository.save(newUser);
};

export const getAllUsers = async (): Promise<User[]> => {
  return UserRepository.find();
};

export const loginUser = async (
  userLoginRequest: UserLoginRequest
): Promise<UserLoginResponse> => {
  const existingUser = await UserRepository.findOneBy({
    email: userLoginRequest.email,
  });
  if (!existingUser) {
    throw new AppError('User with the provided email does not exist!', 404);
  }

  const isPasswordCorrect = await argon2.verify(
    existingUser.password,
    userLoginRequest.password
  );
  if (!isPasswordCorrect) {
    throw new AppError('Incorrect password', 422);
  }

  const token = jwt.sign(
    { userId: existingUser.id, isAdmin: existingUser.role === UserRole.ADMIN },
    'epCWPfx1T3s9FbVx',
    { expiresIn: '1h' }
  );
  return UserLoginResponse.toDto(
    token,
    existingUser.role === UserRole.ADMIN,
    existingUser.id
  );
};
