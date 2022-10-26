import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {User, UserSchema} from "./users/schemas/user.schema";
import {UsersModule} from "./users/users.module";
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
      UsersModule, MongooseModule.forRoot('mongodb://localhost/nest'), PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
