import {Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto) {
    if (this.commentsService.commentValidationCreate(createCommentDto)){
      throw new HttpException("id, postId, name, email, body must be filled in with the correct types", 400);
    }
    return this.commentsService.createComment(createCommentDto);
  }

  @Get()
  getCommentsByPostId(@Query("postId") postId){
    if (isNaN(+postId)){
      return this.commentsService.getAllComments();
    }
    return this.commentsService.getCommentsByPostId(postId);
  }

  @Get(':id')
  getComment(@Param('id') id: string) {
    if (isNaN(+id)){
      throw new HttpException("Type of params id must be a number.", 400)
    }
    return this.commentsService.getCommentById(+id);
  }

  @Patch(':id')
  updateComment(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    if (isNaN(+id)){
      throw new HttpException("Type of params id must be a number.", 400)
    }
    if (this.commentsService.commentValidationUpdate(updateCommentDto)){
      throw new HttpException("name, body must be filled in with the correct types", 400);
    }
    return this.commentsService.updateComment(+id, updateCommentDto);
  }

  @Delete(':id')
  removeComment(@Param('id') id: string) {
    if (isNaN(+id)){
      throw new HttpException("Type of params id must be a number.", 400)
    }
    return this.commentsService.removeComment(+id);
  }
}
