import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { SKIP_RESPONSE_METADATA } from '../../decorators/skip-response.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) { }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const skipResponse = this.reflector.getAllAndOverride<boolean>(SKIP_RESPONSE_METADATA, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (skipResponse) {
      return next.handle();
    }

    return next.handle().pipe(
      map(data => ({
        success: true,
        data,
        message: 'Success'
      }))
    );
  }
}
