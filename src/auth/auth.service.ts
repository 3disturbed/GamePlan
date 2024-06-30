import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    console.log("Validating :" + user.username);
    if (user && pass == user.password) {
      console.log('User validated');
      return user;
    }
    return null;
  }

  async login(user: any) {
    console.log('Logging in' + user.username);
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any) {
    const existingUser = await this.usersService.findOne(user.username);
    if (existingUser) {
      console.log('User already exists');
      return null;
    }
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    console.log('Creating user');
    return this.usersService.create({ ...user, password: hashedPassword });
  }
}
