export class ChangePasswordRequest {
    constructor(
      public oldPassword: string,
      public newPassword: string
    ) {}
  }
  