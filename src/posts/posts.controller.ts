import {Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpException} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    if (this.postsService.postValidationCreate(createPostDto)){
      throw new HttpException("All fields must be filled, incorrect types", 400);
    }
    return this.postsService.createPost(createPostDto);
  }

  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(":id/comments")
  getCommentsByPostId(@Param("id") id: string, @Res() res) {
    if (isNaN(+id)){
      throw new HttpException("Type of params id must be a number.", 400)
    }
    return res.redirect(`/comments?postId=${id}`);
  }

  @Get(':id')
  getPost(@Param('id') id: string) {
    if (isNaN(+id)){
      throw new HttpException("Type of params id must be a number.", 400)
    }
    return this.postsService.getPostByPropId(+id);
  }

  @Patch(':id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    if (isNaN(+id)){
      throw new HttpException("Type of params id must be a number.", 400)
    }
    if (this.postsService.postValidationUpdate(updatePostDto)){
      throw new HttpException("title, body must be filled in with the correct types", 400);
    }
    return this.postsService.updatePost(+id, updatePostDto);
  }

  @Delete(':id')
  removePost(@Param('id') id: string) {
    if (isNaN(+id)){
      throw new HttpException("Type of params id must be a number.", 400)
    }
    return this.postsService.removePost(+id);
  }

  @Get("user/:id")
  getPostsByUserId(@Param('id') id: string){
    if (isNaN(+id)){
      throw new HttpException("Type of params id must be a number.", 400)
    }
    return this.postsService.getPostsByUserId(+id);
  }
}
