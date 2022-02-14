import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;

@Injectable()
export class UserService {

  constructor (
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    let userExists = await this.findByEmail(createUserDto.email);
    if(userExists) throw new BadRequestException('Email já cadastrado!')

    createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
    return this.usersRepository.save(createUserDto);
  } 

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email }, select: ['id', 'email', 'password'] });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto). catch(err => {
      throw new HttpException('Erro ao alterar dados de usuário', err.response.statusCode);
    });
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id).catch(err => {
      throw new HttpException('Erro ao remover usuário', err.response.statusCode);
    });
  }
}
