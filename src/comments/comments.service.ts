import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import { Comment, CommentDocument } from "./schemas/comment.schema";

@Injectable()
export class CommentsService {
  constructor(
      @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
  ) {
  }
  createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const createdComment = new this.commentModel(createCommentDto)
    return createdComment.save();
  }

  getAllComments(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }

  getCommentById(id: number) {
    return this.commentModel.findOne({ id });
  }

  updateComment(id: number, updateCommentDto: UpdateCommentDto) {
    return this.commentModel.findOneAndUpdate({ id }, updateCommentDto);
  }

  removeComment(id: number) {
    return this.commentModel.findOneAndDelete({ id });
  }

  getCommentsByPostId(postId: number){
    return this.commentModel.find({ postId })
  }
}
