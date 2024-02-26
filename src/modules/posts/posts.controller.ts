import { Controller, Get, Post, Body, UseGuards, Request, Put, Query, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDto } from './dto/posts.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { LikePostDto } from './dto/like-post.dto';
import { FilterPostDto } from './dto/filter-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('posts')
@UseGuards(AuthGuard)
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(
    @Body() createPostDto: CreatePostDto,
    @Request() request: Request
  ): Promise<PostDto>{
    createPostDto.userCode = request["user"].userCode;
    return this.postsService.create(createPostDto);
  }

  @Put()
  updatePost(
    @Body() updatePostDto: UpdatePostDto,
    @Request() request: Request
  ): Promise<PostDto> {
    const userCode = request["user"].userCode;
    return this.postsService.updatePost(userCode, updatePostDto);
  }

  @Put('like')
  like(
    @Body() likePostDto: LikePostDto,
    @Request() request: Request
  ): Promise<PostDto> {
    const userCode = request["user"].userCode;
    return this.postsService.uploadLike(userCode, likePostDto.postCode);
  }

  @Get()
  getPosts( 
    @Query() query: FilterPostDto,
    @Request() request: Request
  ) {
    return this.postsService.filterPost(query);
  }

  @Delete()
  deletePost(
    @Query() query: DeletePostDto,
    @Request() request: Request
  ) {
    const { postCode } = query;
    const { userCode } = request['user'];
    console.log(postCode)
    return this.postsService.update({ postCode: +postCode, userCode }, { deletedAt: new Date() })
  }


}
