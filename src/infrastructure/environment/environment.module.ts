import { EnvironmentService } from '@/infrastructure/environment/environment.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
