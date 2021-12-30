import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { TaskModule } from './models/task/task.module';
import { Connection } from 'typeorm';


@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
