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

export async function changeUserPassword(email: string, oldPassword: string, newPassword: string) {

  const hashedOldPassword = await argon2.hash(oldPassword)
  const hashedNewPassword = await argon2.hash(newPassword)

  if (hashedOldPassword != hashedNewPassword){
    const user = await UserRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error(`User with email "${email}" not found`);
    }

    user.password = hashedNewPassword;
    await UserRepository.save(user);
    return true
  } 
  else {
    return null;
  }
};
