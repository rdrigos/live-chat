import { EnvironmentModule } from '@/infrastructure/environment/environment.module';
import { environmentSchema } from '@/infrastructure/environment/environment.schema';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => environmentSchema.parse(env),
      isGlobal: true,
    }),
    EnvironmentModule,
  ],
})
export class AppModule {}
