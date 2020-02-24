import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getAllTasks(user: User): Promise<Task[]> {
    return await this.taskRepository
      .createQueryBuilder("task").andWhere('task.userId = :userId', { userId: user.id })
      .getMany();
  }

  async getTaskById(user: User, id: number): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: {id, userId: user.id} });
    if (!found) {
      throw new NotFoundException(`不存在ID为${id}的Task`);
    }
    return found;
  }

  async updateTaskStatus(user: User, id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(user, id);
    task.status = status;
    await task.save();
    return task;
  }

  async deleteTaskById(user: User, id: number): Promise<void> {
    const result = await this.taskRepository.delete({ id, userId: user.id });
    if(!result.affected) {
      throw new NotFoundException(`不存在ID为${id}的Task`);
    }
  }

  async createTask(user: User, createTaskDto: CreateTaskDto): Promise<Task> {
    const {title, desc} = createTaskDto;
    const task = this.taskRepository.create({title, desc, status: TaskStatus.open})
    task.user = user;
    await task.save();
    delete task.user
    return task;
  }
}
