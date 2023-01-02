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
  
  const hashedNewPassword = await argon2.hash(newPassword)

  if (oldPassword != newPassword){
    
    const user = await UserRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    } else {
      let isOldPasswordCorrect = await argon2.verify(user.password, oldPassword)
      if (isOldPasswordCorrect){
        try {
        user.password = hashedNewPassword;
        await UserRepository.save(user);
        } catch (error) {
          throw new Error(error.message);
        }
      } else {
        throw new Error('Invalid data given.');
      }    
    }
  } 
  else {
    throw new Error('New password can not be the same as the old one');
  }
};
