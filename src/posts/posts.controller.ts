import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(":id/comments")
  getCommentsByPostId(@Param("id") id: string, @Res() res) {
    return res.redirect(`/comments?postId=${id}`);
  }

  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postsService.getPostByPropId(+id);
  }

  @Patch(':id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost(+id, updatePostDto);
  }

  @Delete(':id')
  removePost(@Param('id') id: string) {
    return this.postsService.removePost(+id);
  }

  @Get("user/:id")
  getPostsByUserId(@Param('id') id: string){
    return this.postsService.getPostsByUserId(+id);
  }
}
