import {Injectable} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {InjectModel} from "@nestjs/mongoose";
import { Model } from "mongoose";
import {Post, PostDocument} from "./schemas/post.schema";

@Injectable()
export class PostsService {
  constructor(
      @InjectModel(Post.name) private postModel: Model<PostDocument>
  ) {}

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

  removePost(id: number) {
    return this.postModel.findOneAndDelete({ id });
    // todo relations
  }
  getPostsByUserId(userId: number){
    return this.postModel.find({ userId })
  }
}
