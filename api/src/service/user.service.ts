import { UserCreateRequest } from '../model/request/UserCreateRequest';
import { UserRepository } from '../dao/user.repository';
import { User } from '../model/entity/User';
import * as argon2 from "argon2";

export const registerUser = async (userCreateRequest: UserCreateRequest) => {
  const hashedPassword = await argon2.hash(userCreateRequest.password);
  const newUser: User = UserCreateRequest.toEntity(userCreateRequest, hashedPassword);
  UserRepository.save(newUser);
};

export const getAllUsers = async (): Promise<User[]> => {
  return UserRepository.find();
};
