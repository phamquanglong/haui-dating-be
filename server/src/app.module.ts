import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { HobbiesModule } from './modules/hobbies/hobbies.module';
import { MessagesModule } from './modules/messages/messages.module';
import { UserActionsModule } from './modules/user-actions/user-actions.module';
import { UserHobbiesModule } from './modules/user-hobbies/user-hobbies.module';
import { UserImagesModule } from './modules/user-images/user-images.module';
import { UserSettingsModule } from './modules/user-settings/user-settings.module';
import { UsersModule } from './modules/users/users.module';
import { ProfileModule } from './modules/profile/profile.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { GatewayModules } from './gatewaies/gateway.module';
import { UserSocketModule } from './modules/user-socket/user-socket.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'tinder',
      // entities: [__dirname + './**/*.entity.{js,ts}'],
      autoLoadEntities: true,
      synchronize: true,
      migrations: ['src/migration/**/*.ts'],
      subscribers: ['src/subscriber/**/*.ts'],
    }),

    UsersModule,
    AuthModule,
    HobbiesModule,
    UserHobbiesModule,
    UserSettingsModule,
    UserImagesModule,
    UserActionsModule,
    ConversationsModule,
    MessagesModule,
    ProfileModule,
    CloudinaryModule,
    GatewayModules,
    UserSocketModule,
  ],
})
export class AppModule {}
