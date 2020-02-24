import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.taskRepository
    .createQueryBuilder("task")
    .getMany();
    return tasks;
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`不存在ID为${id}的Task`);
    }
    return found;
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }

  async deleteTaskById(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if(!result.affected) {
      throw new NotFoundException(`不存在ID为${id}的Task`);
    }
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const {title, desc} = createTaskDto;
    const task = this.taskRepository.create({title, desc, status: TaskStatus.open})
    await task.save();
    return task;
  }
}
