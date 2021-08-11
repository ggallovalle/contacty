import {
  ArgumentsHost,
  BadRequestException as HttpBadRequestException,
  Catch,
  NotFoundException as HttpNotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { AppException } from './app.exception';
import { ValidationException } from './validation.exception';
import { NotFoundException } from './not-found.exception';

@Catch(AppException)
export class AppExceptionFilter extends BaseExceptionFilter {
  catch(exception: AppException, host: ArgumentsHost): any {
    if (exception instanceof NotFoundException) {
      super.catch(new HttpNotFoundException(exception.message), host);
    } else if (exception instanceof ValidationException) {
      super.catch(new HttpBadRequestException(exception.message), host);
    } else {
      super.handleUnknownError(exception, host, this.applicationRef);
    }
  }
}
