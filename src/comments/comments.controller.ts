import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.createComment(createCommentDto);
  }

  @Get()
  getCommentsByPostId(@Query("postId") postId){
    return postId ? this.commentsService.getCommentsByPostId(postId)
        : this.commentsService.getAllComments();
  }

  @Get(':id')
  getComment(@Param('id') id: string) {
    return this.commentsService.getCommentById(+id);
  }

  @Patch(':id')
  updateComment(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.updateComment(+id, updateCommentDto);
  }

  @Delete(':id')
  removeComment(@Param('id') id: string) {
    return this.commentsService.removeComment(+id);
  }
}
