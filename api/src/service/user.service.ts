import { UserCreateRequest } from '../model/request/UserCreateRequest';
import { UserRepository } from '../dao/user.repository';
import { User } from '../model/entity/User';
import * as argon2 from 'argon2';
import { UserLoginRequest } from '../model/request/UserLoginRequest';
import { ChangePasswordRequest } from '../model/request/ChangePasswordRequest';
import { AppError } from '../model/constants/AppError';
import * as jwt from 'jsonwebtoken';
import { UserRole } from '../model/constants/UserRole';
import { UserLoginResponse } from '../model/response/UserLoginResponse';
import { AuthRequest } from '../model/request/AuthRequest';

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

  await verifyPasswordHash(userLoginRequest.password, existingUser.password);

  const jwtKey = process.env.JWT_KEY ? process.env.JWT_KEY : 'epCWPfx1T3s9FbVx';
  const token = jwt.sign(
    { userId: existingUser.id, isAdmin: existingUser.role === UserRole.ADMIN },
    jwtKey,
    { expiresIn: '1h' }
  );

  return UserLoginResponse.toDto(
    token,
    existingUser.role === UserRole.ADMIN,
    existingUser.id
  );
};

export async function changeUserPassword(req: AuthRequest) {

  const changePwRequest: ChangePasswordRequest = req.body;
  if(changePwRequest.oldPassword === changePwRequest.newPassword) {
    throw new AppError('New password can\'t be the same as the old one!', 422);
  }

  const user = await UserRepository.findOne({ where: { id: req.userData.id } });
  
  await verifyPasswordHash(changePwRequest.oldPassword, user!.password);

  const hashedNewPassword = await argon2.hash(changePwRequest.newPassword);

  user!.password = hashedNewPassword;
  await UserRepository.save(user!);
};

const verifyPasswordHash = async (password: string, hash: string): Promise<void> => {
  const isPasswordCorrect = await argon2.verify(hash, password);
  if (!isPasswordCorrect) {
    throw new AppError('Incorrect password', 422);
  }
}