import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService){}

  @Get()
  getAllTasks(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task>{
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch(':id/status')
  updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Delete(':id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteTaskById(id);
  }
}