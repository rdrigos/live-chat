import { EnvironmentModule } from '@/infrastructure/environment/environment.module';
import { environmentSchema } from '@/infrastructure/environment/environment.schema';
import { PrismaModule } from '@/infrastructure/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => environmentSchema.parse(env),
      isGlobal: true,
    }),
    EnvironmentModule,
    PrismaModule,
  ],
})
export class AppModule {}
