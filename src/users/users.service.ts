import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Post, PostDocument } from "../posts/schemas/post.schema";
import { Todo, TodoDocument } from "../todos/schemas/todos.schema";
import { Comment, CommentDocument } from "../comments/schemas/comment.schema";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {CompanyDocument} from "./schemas/company.schema";
import {AddressDocument} from "./schemas/address.schema";

@Injectable()
export class UsersService {
  constructor(
      @InjectModel(User.name) private userModel: Model<UserDocument>,
      @InjectModel(Post.name) private  postModel: Model<PostDocument>,
      @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
      @InjectModel(Todo.name) private todoModel: Model<TodoDocument>
  ) {}
  userValidationCreate(user : CreateUserDto) : boolean {
    const { id, name, username, email, address, phone, website, company } = user;
    if (!id || !name || !username || !email || !address || !phone || !website || !company){
      return true;
    }
    return (isNaN(+id) || typeof name !== "string" || typeof email !== "string"
            || typeof username !== "string" || typeof address !== "object"
            || typeof phone !== "string"  || typeof website !== "string"
            || typeof company !== "object"
    );
  }
  userValidationUpdate(user : UpdateUserDto) : boolean {
    const {name, address, phone, website, company} = user;
    if (!name || !address || !phone || !website || !company) {
      return true;
    }
    return typeof name !== "string" || typeof address !== "object"
        || typeof phone !== "string" || typeof website !== "string"
        || typeof company !== "object"
  }
  addressValidation(address : AddressDocument) : boolean{
    if (!address.city || !address.street || !address.suite
        || !address.zipcode || !address.geo.lat || !address.geo.lng){
      return true;
    }
    return !!(typeof address.city !== "string" || typeof address.street !== "string" || typeof address.suite !== "string"
        || typeof address.zipcode !== "string" || typeof address.geo.lat !== "string" || typeof address.geo.lng !== "string");
  }
  companyValidation(company : CompanyDocument) : boolean {
    if(!company.name || !company.catchPhrase || !company.bs){
      return true;
    }
    return typeof company.name !== "string" || typeof company.catchPhrase !== "string" || typeof company.bs !== "string"
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  getUserByPropId(id: number): Promise<User> {
    return this.userModel.findOne({ id }).exec();
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ id }, updateUserDto);
  }

  async removeUser(id: number) {
    const postIds = await this.postModel.find({ userId: id }, "id");
    for (let i =0; i < postIds.length; ++i){
      await this.commentModel.deleteMany({ postId: +postIds[i].id })
    }
    await this.postModel.deleteMany({ userId: id});
    await this.todoModel.deleteMany( { userId: id });
    return this.userModel.findOneAndDelete({ id });
  }
}
