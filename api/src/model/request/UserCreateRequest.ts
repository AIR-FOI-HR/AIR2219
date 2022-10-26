export class UserCreateRequest {
  constructor(
    public firstName: string,
    public lastName: string,
    public username: string,
    public email: string,
    public password: string
  ) {}
}
