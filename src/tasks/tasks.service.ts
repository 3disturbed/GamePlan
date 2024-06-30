import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class TasksService {
  private tasksDir = path.join(__dirname, '../../tasks');

  async addTask(username: string, task: any) {
    const userTasksDir = path.join(this.tasksDir, username);
    if (!await this.directoryExists(userTasksDir)) {
      await fs.mkdir(userTasksDir, { recursive: true });
    }

    const filePath = path.join(userTasksDir, 'tasks.json');
    let tasks = [];

    if (await this.fileExists(filePath)) {
      const data = await fs.readFile(filePath);
      tasks = JSON.parse(data.toString());
    }

    tasks.push(task);
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
  }

  async getTasks(username: string) {
    const filePath = path.join(this.tasksDir, username, 'tasks.json');
    if (await this.fileExists(filePath)) {
      const data = await fs.readFile(filePath);
      return JSON.parse(data.toString());
    }
    return [];
  }

  private async directoryExists(dir: string) {
    try {
      await fs.access(dir);
      return true;
    } catch {
      return false;
    }
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
