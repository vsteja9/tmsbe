import { CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
import { UserRoles } from './models/user.entity';

configDotenv();
export class UserAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    if (!token) return false;
    try {
      const secret = process.env.JWTSECRET;
      const decoded: any = jwt.verify(token, secret);
      const userRoutes = request.url.startsWith('/users');
      if (userRoutes) {
        if (decoded.role === UserRoles.ADMIN) return true;
        else throw new HttpException('Do not have permissions to access', 403);
      }
      return true;
    } catch (err) {
      throw new HttpException(err.message, 403);
    }
  }
}
