import { Controller, Get, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';

@Controller()
export class MainController {
  @Get()
  getRoot(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies.token;
    if (token) {
      res.redirect('/tasks/add');
    } else {
      res.redirect('/auth/login');
    }
  }
}
