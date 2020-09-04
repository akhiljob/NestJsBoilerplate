import {
  ArgumentsHost,
  ExceptionFilter,
  Injectable,
  Catch,
} from '@nestjs/common';
import { AppException } from '../exceptions/AppException';
import { Logger } from '../Logger';
import { v4 } from 'uuid';

@Catch(AppException)
@Injectable()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}
  /**
   * Implement the handler method for AppException.
   *
   * @param   {AppException}    exception   The instance of the raised AppException.
   * @param   {ArgumentsHost}   host        The Execution Context of Nest.
   * @returns {Express.Response}
   */
  catch(exception: AppException, host: ArgumentsHost): Express.Response {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const errorReference = v4();
    this.logExceptionDetails(exception, host, errorReference);
    return response.status(exception.httpStatusCode).json({
      error: {
        code: exception.status,
        message: exception.message,
        errorId: errorReference,
      }
    });
  }
  private logExceptionDetails = (
    exception: any,
    host: ArgumentsHost,
    errorReference?: string,
  ) => {
    try {
      const ctx = host.switchToHttp();
      const request = ctx.getRequest();
      const exceptionStatusCode =
        (exception.getStatus && exception.getStatus()) ||
        exception.httpStatusCode;
      this.logger.error(
        `Exception: ${exception.message} with code ${exceptionStatusCode} and Error Id: ${errorReference} ` +
          `occurred on handling request Method: ${request.method} and Url: '${
            request.path
          }' with request body : ${JSON.stringify(request.body)}`,
      );
    } catch (exception) {
      this.logger.error(
        `An error occurred during logging the exception details: ${exception.message}`,
      );
    }
  };
}
