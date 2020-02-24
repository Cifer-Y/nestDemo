import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService){}

  @Get()
  getAllTasks(@GetUser() user: User): Promise<Task[]> {
    return this.tasksService.getAllTasks(user);
  }

  @Get(':id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.getTaskById(user, id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @GetUser() user: User,
    @Body() createTaskDto: CreateTaskDto
  ): Promise<Task>{
    return this.tasksService.createTask(user, createTaskDto);
  }

  @Patch(':id/status')
  updateTaskStatus(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(user, id, status);
  }

  @Delete(':id')
  deleteTaskById(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.tasksService.deleteTaskById(user, id);
  }
}
