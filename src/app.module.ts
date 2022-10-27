import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from "./users/users.module";
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
      MongooseModule.forRoot('mongodb://localhost/nest'),
      UsersModule,
      PostsModule,
      CommentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
