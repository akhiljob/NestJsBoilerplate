import { ResponseCode, MainResponseCode } from '../constants/ResponseCode';
import { HttpStatus } from '@nestjs/common';

export class AppException extends Error {
  public readonly status: ResponseCode = MainResponseCode.GENERAL_ERROR;
  public readonly httpStatusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

  constructor(
    status: ResponseCode | string,
    message?: string,
    httpStatusCode?: HttpStatus,
  ) {
    super(message || status);

    if (typeof message !== 'undefined') {
      this.status = status as ResponseCode;
    }

    if (typeof httpStatusCode !== 'undefined') {
      this.httpStatusCode = httpStatusCode;
    }
  }

}
