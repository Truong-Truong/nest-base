import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { UsersRepository } from './repositories/users.repository';
import { LoggerModule } from '../logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import moduleConfig from './configs/module.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import AllEntities from './entities/all.entity';

@Module({
  controllers: [UsersController],
  imports: [
    ConfigModule.forFeature(moduleConfig),
    LoggerModule.register(moduleConfig().module_name),
    TypeOrmModule.forFeature([...AllEntities]),
  ],
  providers: [
    UsersService,
    {
      provide: 'USER_REPOSITORY',
      useClass: UsersRepository,
    },
  ],
})
export class UsersModule {}
