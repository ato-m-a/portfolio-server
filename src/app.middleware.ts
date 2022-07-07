import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthValidator implements NestMiddleware {
  use(req: any, res: any, next: () => void): any {
    if (req.session && req.session.auth) {
      if (req.session.auth.role === 'super') {
        next();
      } else {
        res.status(403).send('permission denied');
      }
    } else {
      res.status(403).send('permission denied');
    }
  }
}