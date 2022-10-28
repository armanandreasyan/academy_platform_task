import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {MongooseModule} from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import {Post, PostSchema} from "../posts/schemas/post.schema";
import { Comment, CommentSchema} from "../comments/schemas/comment.schema";

@Module({
  imports: [ MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
      { name: Comment.name, schema: CommentSchema }
  ])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {

}
