import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Req,
  Put,
  Delete
} from '@nestjs/common'
import { CommentsDto } from './comments.dto'
import { CommentsService } from './comments.service'
import { CommentsEntity } from '../db/entities/comments.entity'
import { AuthGuard } from 'src/auth/auth.guard'
import { Request } from 'express'

declare module 'express' {
  interface Request {
    user?: any
  }
}

@UseGuards(AuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(
    @Body() dto: CommentsDto,
    @Req() req: Request
  ): Promise<CommentsEntity> {
    const user = req.user as { sub: string }
    if (!user || !user.sub) {
      throw new Error('Usuário não autenticado ou token JWT inválido')
    }
    dto.user_id = String(user.sub)
    const result = await this.commentsService.create(dto)
    if (result instanceof CommentsEntity) {
      return result
    }
    throw new Error('Failed to create comment')
  }

  @Get(':movie_id')
  async getByMovieId(
    @Param('movie_id') movie_id: number
  ): Promise<CommentsEntity[]> {
    try {
      const comments = await this.commentsService.findByMovieId(movie_id)
      return Array.isArray(comments) ? comments : []
    } catch (error) {
      return []
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: CommentsDto
  ): Promise<CommentsEntity> {
    return this.commentsService.update(id, dto)
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ success: boolean }> {
    await this.commentsService.remove(id)
    return { success: true }
  }
}
