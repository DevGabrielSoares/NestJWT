import { HttpException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {

  constructor (
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}


  async create(createTaskDto: CreateTaskDto) {
    return await this.tasksRepository.save(createTaskDto).catch(err => {
      throw new HttpException('Erro ao cadastrar tarefa', err.response.statusCode);
    });
  }

  async findAll() {
    return await this.tasksRepository.find();
  }

  async findOne(id: number) {
    return await this.tasksRepository.findOne(id);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.tasksRepository.update(id, updateTaskDto).catch(err => {
      throw new HttpException("Erro ao atualizar tarefa", err.response);
    });
  }

  async remove(id: number) {
    await this.tasksRepository.delete(id).catch(err => {
      throw new HttpException("Erro ao remover tarefa", err.response.statusCode);
    });;
  }
}
