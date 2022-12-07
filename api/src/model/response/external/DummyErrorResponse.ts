import { Error } from "../../entity/Error";

export class DummyErrorResponse {
    constructor(
      public id: string,
      public description: string,
      public timestamp: number
    ) {}

    public static toEntity(description: string, statusCode: number): Error {
      return new Error(statusCode, description);
    }
  }