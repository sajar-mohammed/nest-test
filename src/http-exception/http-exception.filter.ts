import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    // 1️⃣ Handle Nest HttpExceptions
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseData = exception.getResponse();

      if (typeof responseData === 'string') {
        message = responseData;
      } else if (
        typeof responseData === 'object' &&
        'message' in responseData
      ) {
        message = (responseData as any).message;
      } else {
        message = 'Unexpected error';
      }
    }

    if (exception?.code === 'P2002') {
      status = HttpStatus.CONFLICT;
      message = 'Unique constraint failed';
    }

    if (exception?.code === 'P2025') {
      status = HttpStatus.NOT_FOUND;
      message = 'Record not found';
    }


    response.status(status).json({
      success: false,
      statusCode: status,
      path: request.url,
      timestamp: new Date().toISOString(),
      message: message,
    });
  }
}