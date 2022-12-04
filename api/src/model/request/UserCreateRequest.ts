export class UserCreateRequest {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string,
    public password: string
  ) {}
}
