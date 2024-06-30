import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class UsersService {
  private usersFilePath = path.join(__dirname, '../../users.json');
  private users = {};

  constructor() {
    this.loadUsers();
  }

  async loadUsers() {
    if (await this.fileExists(this.usersFilePath)) {
      const data = await fs.readFile(this.usersFilePath);
      this.users = JSON.parse(data.toString());
      console.log('Loaded users from users.json');
    } else {
      console.log('users.json not found, starting with an empty user list');
    }
  }

  async saveUsers() {
    await fs.writeFile(this.usersFilePath, JSON.stringify(this.users, null, 2));
    console.log('Saved users to users.json');
  }

  async findOne(username: string) {
    console.log("Found :" + this.users[username]);
    return this.users[username];
  }

  async create(user: any) {
    this.users[user.username] = user;
    await this.saveUsers();
    return user;
  }

  private async fileExists(file: string) {
    try {
      await fs.access(file);
      return true;
    } catch {
      return false;
    }
  }
}
