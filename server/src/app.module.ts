import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'yul',
      password: 'yul119',
      database: 'tinder',
      // entities: [__dirname + './**/*.entity.{js,ts}'],
      autoLoadEntities: true,
      synchronize: true,
      migrations: ['src/migration/**/*.ts'],
      subscribers: ['src/subscriber/**/*.ts'],
    }),

    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
