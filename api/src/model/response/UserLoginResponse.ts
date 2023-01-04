export class UserLoginResponse {
  constructor(
    public token: string,
    public isAdmin: boolean,
    public userId: string
  ) {}

}
