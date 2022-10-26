import { UserCreateRequest } from '../model/request/UserCreateRequest';
import { UserRepository } from '../dao/user.repository';
import { User } from '../model/entity/User';

export const registerUser = async (userCreateRequest: UserCreateRequest) => {
  const newUser: User = new User(
    userCreateRequest.firstName,
    userCreateRequest.lastName,
    userCreateRequest.username,
    userCreateRequest.email,
    userCreateRequest.password
  );
  UserRepository.save(newUser);
};

export const getAllUsers = async (): Promise<User[]> => {
  return UserRepository.find();
};
