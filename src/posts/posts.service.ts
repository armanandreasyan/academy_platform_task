import {Injectable} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {InjectModel} from "@nestjs/mongoose";
import { Model } from "mongoose";
import {Post, PostDocument} from "./schemas/post.schema";
import {Comment, CommentDocument} from "../comments/schemas/comment.schema";

@Injectable()
export class PostsService {
  constructor(
      @InjectModel(Post.name) private postModel: Model<PostDocument>,
      @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
  ) {}
  postValidationCreate(post: CreatePostDto) : boolean{
    const { id, userId, title, body } = post;
    if (!id || !userId || !title || !body){
      return true;
    }
    return isNaN(+id) || isNaN(+userId) || typeof title !== "string" || typeof body !== "string";
  }
  postValidationUpdate(post: UpdatePostDto) : boolean{
    const { title, body } = post;
    if (!title || !body){
      return true;
    }
    return typeof title !== "string" || typeof body !== "string";
  }

  createPost(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  getAllPosts(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  getPostByPropId(id: number): Promise<Post> {
    return this.postModel.findOne({ id }).exec();
  }

  updatePost(id: number, updatePostDto: UpdatePostDto) {
    return this.postModel.findOneAndUpdate({ id }, updatePostDto);
  }

  async removePost(id: number) {
    await  this.commentModel.deleteMany({ postId: id });
    return this.postModel.findOneAndDelete({ id });
  }
  getPostsByUserId(userId: number){
    return this.postModel.find({ userId })
  }
}
