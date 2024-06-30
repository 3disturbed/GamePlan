import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  getLoginPage(@Res() res: Response) {
    res.sendFile('Auth.html', { root: 'public' });
  }

  @Post('login')
  async login(@Body() req, @Res() res: Response) {
    
    const user = await this.authService.validateUser(req.username, req.password);
    if (!user) {
      console.log('Invalid credentials');
      return res.status(401).json({ message: 'Invalid credentials' });
      
    }
    console.log(req);
    const token = await this.authService.login(user);
    console.log(token);
    res.cookie('token', token.access_token, { httpOnly: true });
    console.log('Logged in');
    res.redirect('/tasks/add');
  }

  @Post('register')
  async register(@Body() req, @Res() res: Response) {
    console.log(req);
    const newUser = await this.authService.register(req);
    if (!newUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const token = await this.authService.login(newUser);
    res.cookie('token', token.access_token, { httpOnly: true });
    console.log('Registered and logged in');
    res.redirect('/tasks/add');
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('token');
    res.redirect('login');
  }
}
