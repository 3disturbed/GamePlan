import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MainController } from './main.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'img'), // Path to the public folder
      serveRoot: '/', // URL prefix for serving static files
    }),
    AuthModule,
    TasksModule,
    UsersModule
  ],
  controllers: [MainController],
})
export class AppModule {}
