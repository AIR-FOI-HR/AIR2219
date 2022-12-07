import { User } from "../entity/User";

export class UserCreateRequest {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string,
    public password: string
  ) {}

  public static toEntity(userCreateRequest: UserCreateRequest, hashedPassword: string): User {
    return new User(
      userCreateRequest.firstName,
      userCreateRequest.lastName,
      userCreateRequest.phone,
      userCreateRequest.email,
      hashedPassword
    );
  }
}
