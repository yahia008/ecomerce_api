import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import {ConfigService} from '@nestjs/config'

@Injectable()

export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private ConfigService:ConfigService) {} 
  async canActivate(
    context: ExecutionContext,
  ):Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.ConfigService.get<string>('JWT_SECRET')
        }
      );

      
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      

      request.user = payload;

      

    } catch(error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {

    
    const authHeader = request.headers['authorization'];
    

    if (!authHeader) {
      return undefined; // Return undefined if the header is missing
  }
    const [type, token] = authHeader.split(' ') ?? [];
    
    
    return type === 'Bearer' ? token : undefined;
  }
}

