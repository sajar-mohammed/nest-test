import { ResponseInterceptor } from './response.interceptor';
import { Reflector } from '@nestjs/core';

describe('ResponseInterceptor', () => {
  it('should be defined', () => {
    expect(new ResponseInterceptor(new Reflector())).toBeDefined();
  });
});
