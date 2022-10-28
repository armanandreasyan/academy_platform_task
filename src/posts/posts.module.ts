import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {MongooseModule} from "@nestjs/mongoose";
import { Post, PostSchema } from "./schemas/post.schema";
import { Comment, CommentSchema } from "../comments/schemas/comment.schema";

@Module({
  imports: [ MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Comment.name, schema: CommentSchema}
  ])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
