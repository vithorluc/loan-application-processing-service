import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService,  private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    const secretKey = this.configService.get<string>('JWT_SECRET');

    if (!token) {
      return false;
    }
    
    try {

      const payload = this.jwtService.verify(token, { secret: secretKey });
      request.user = payload;
      console.log(payload)
      return true;
    } catch (error) {
      return false;
    }
  }
}
