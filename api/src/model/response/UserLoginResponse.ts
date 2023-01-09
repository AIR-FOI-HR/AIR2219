export class UserLoginResponse {
  constructor(
    public token: string,
    public isAdmin: boolean,
    public userId: string
  ) {}
  
  public static toDto(token:string, isAdmin: boolean, userId: string): UserLoginResponse {
    return new UserLoginResponse(
        token,
        isAdmin,
        userId
    );
  }
}
