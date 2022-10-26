import { User } from '../entity/User';

export class UserResponse {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public username: string,
    public email: string
  ) {}

  public static toDto(user: User): UserResponse {
    return new UserResponse(
      user.id,
      user.firstName,
      user.lastName,
      user.username,
      user.email
    );
  }
}
