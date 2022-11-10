import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * In Clean Architecture, one would not throw any errors
 * to handle application errors but return proper HTTP status instead.
 * However, NestJS requires to throw an HttpException error
 * in order to return the desired HTTP status.
 */
export class HttpError {
  /**
   * 400 Bad Request
   */
  public static badRequest(message?: object): never {
    throw new HttpException(
      message ? message : 'Bad request',
      HttpStatus.BAD_REQUEST
    );
  }
  
  /**
   * 401 Unauthorized
   */
   public static unauthorized(message?: object): never {
    throw new HttpException(
      message ? message : 'Unauthorized',
      HttpStatus.UNAUTHORIZED
    );
  }
  
  /**
   * 402 Payment Required
   */
   public static paymentRequired(message?: object): never {
    throw new HttpException(
      message ? message : 'Payment Required',
      HttpStatus.PAYMENT_REQUIRED
    );
  }
  
  /**
   * 403 Forbidden
   */
   public static forbidden(message?: object): never {
    throw new HttpException(
      message ? message : 'Forbidden',
      HttpStatus.FORBIDDEN
    );
  }
  
  /**
   * 409 Conflict
   */
   public static conflict(message?: object): never {
    throw new HttpException(
      message ? message : 'Conflict',
      HttpStatus.CONFLICT
    );
  }

  /**
   * 500 Internal Server Error
   */
   public static internalServerError(message?: object): never {
    throw new HttpException(
      message ? message : 'Internal Server Error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}