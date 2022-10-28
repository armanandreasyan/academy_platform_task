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
  ) {}

  commentValidationCreate(comment : CreateCommentDto) : boolean{
    const { id, postId, name, email, body } = comment;
    if (!id || !postId || !name || !email || !body){
      return true;
    }
    return isNaN(+id) || isNaN(+postId) || typeof name !== "string"
        || typeof email !== "string" || typeof body !== "string";
  }
  commentValidationUpdate(comment : UpdateCommentDto) : boolean{
    const { name, body } = comment;
    if (!name  || !body){
      return true;
    }
    return typeof name !== "string" || typeof body !== "string";
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
