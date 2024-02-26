import { BadRequestException, Injectable } from '@nestjs/common';
import { AbstractService } from 'src/shared/utils/Abstract.service';
import { PostDto } from './dto/posts.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { FilterPostDto } from './dto/filter-post.dto';

@Injectable()
export class PostsService extends AbstractService<PostDto>{
  constructor(
    protected readonly prismaService: PrismaService,
  ){
    const prismaServiceImplements = prismaService;
    const module = 'posts';
    super(prismaServiceImplements, module);
  }

  async updatePost (userCode: number, updatePostDto: UpdatePostDto): Promise<PostDto>{
    try {
      const { postCode } = updatePostDto;
      delete updatePostDto.postCode;
      const post = await this.getByIds({ userCode,  postCode});

      if (!post) {
        throw new Error("No se encuentra el post enviado")
      }

      if (post.userCode != +userCode) {
        throw new Error("El post enviado no corresponde al dueño")
      }

      return this.update({userCode, postCode}, updatePostDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async uploadLike(userCode: number, postCode: number) {
    try {
      const post = await this.getByIds({ userCode,  postCode});

      if (!post) {
        throw new Error("No se encuentra el post enviado")
      }

      if (post.userCode != +userCode) {
        throw new Error("El post enviado no corresponde al dueño")
      }

      return this.update({userCode, postCode}, { likes: post.likes += 1, updatedAt: new Date() });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async filterPost(query: FilterPostDto) {
    try {
      const { userCode, postCode, title, content, likes, page, pageSize } = query;
      const filter = {};

      if (title) {
        filter['title'] = { contains: query.title, mode: "insensitive" };
      }

      if (content) {
        filter['content'] = { contains: query.content, mode: "insensitive" };
      }

      if (likes) {
        filter["likes"] = +likes;
      }
  
      if (postCode) {
        filter["postCode"] = +postCode;
      }

      if (userCode) {
        filter['userCode'] = +userCode;
      }

      return this.getAllWithFiltersAndPagination(+page, +pageSize, filter)
    } catch (error) {
      throw new BadRequestException(error.message);
    }

  }
}
