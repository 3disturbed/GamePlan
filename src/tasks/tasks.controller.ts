import { Controller, Get, Post, Body, Req, Res, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CustomRequest } from '../custom-request.interface';
import { Response } from 'express';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get('add')
  getAddTaskPage(@Res() res: Response) {
    res.sendFile('AddTask.html', { root: 'public' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('view')
  getViewTasksPage(@Res() res: Response) {
    res.sendFile('Tasks.html', { root: 'public' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('settings')
  getSettingsPage(@Res() res: Response) {
    res.sendFile('Settings.html', { root: 'public' });
  }

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async addTask(@Req() req: CustomRequest, @Body() task: any, @Res() res: Response) {
    await this.tasksService.addTask(req.user.username, task);
    res.redirect('/tasks/view');
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTasks(@Req() req: CustomRequest) {
    return this.tasksService.getTasks(req.user.username);
  }
}
