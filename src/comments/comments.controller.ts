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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam
} from '@nestjs/swagger'

declare module 'express' {
  interface Request {
    user?: any
  }
}

@ApiTags('Comments')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Adiciona comentário ao filme (autenticado)' })
  @ApiBody({
    type: CommentsDto,
    examples: {
      exemplo: {
        value: {
          movie_id: 123,
          title: 'Ótimo filme!',
          content: 'Gostei muito.',
          rating: 5,
          isrecommended: true
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Comentário criado',
    type: CommentsEntity
  })
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

  @ApiOperation({ summary: 'Lista comentários de um filme (público)' })
  @ApiParam({ name: 'movie_id', example: 123 })
  @ApiResponse({
    status: 200,
    description: 'Lista de comentários',
    type: [CommentsEntity]
  })
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

  @ApiOperation({
    summary: 'Atualiza comentário (autenticado)'
  })
  @ApiParam({ name: 'id', example: 'uuid-do-comentario' })
  @ApiBody({
    type: CommentsDto,
    examples: {
      exemplo: {
        value: {
          movie_id: 123,
          title: 'Filme chato!',
          content: 'Não gostei muito.',
          rating: 3,
          isrecommended: false
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Comentário atualizado',
    type: CommentsEntity
  })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: CommentsDto
  ): Promise<CommentsEntity> {
    return this.commentsService.update(id, dto)
  }

  @ApiOperation({ summary: 'Remove comentário (autenticado)' })
  @ApiParam({ name: 'id', example: 'uuid-do-comentario' })
  @ApiResponse({
    status: 200,
    description: 'Comentário removido',
    schema: { example: { success: true } }
  })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ success: boolean }> {
    await this.commentsService.remove(id)
    return { success: true }
  }
}
