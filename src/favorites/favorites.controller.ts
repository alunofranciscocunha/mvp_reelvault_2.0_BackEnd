import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Get,
  UseGuards,
  Req
} from '@nestjs/common'
import { FavoritesService } from './favorites.service'
import { FavoritesDto } from './favorites.dto'
import { FavoritesEntity } from '../db/entities/favorites.entity'
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

@ApiTags('Favorites')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiOperation({
    summary: 'Adiciona filme aos favoritos do usuário autenticado'
  })
  @ApiBody({
    type: FavoritesDto,
    examples: {
      exemplo: {
        value: {
          movie_id: 123,
          poster_path: '/poster/path.jpg',
          title: 'O Poderoso Chefão'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Favorito criado',
    type: FavoritesEntity
  })
  @Post()
  async create(
    @Body() dto: FavoritesDto,
    @Req() req: Request
  ): Promise<FavoritesEntity> {
    const user = req.user as { sub: string }
    if (!user || !user.sub) {
      throw new Error('Usuário não autenticado ou token JWT inválido')
    }
    dto.user_id = String(user.sub)
    return this.favoritesService.create(dto)
  }

  @ApiOperation({ summary: 'Lista favoritos do usuário' })
  @ApiParam({ name: 'user_id', example: 'uuid-do-usuario' })
  @ApiResponse({
    status: 200,
    description: 'Lista de favoritos',
    type: [FavoritesEntity]
  })
  @Get('user/:user_id')
  async getByUser(
    @Param('user_id') user_id: string
  ): Promise<FavoritesEntity[]> {
    return this.favoritesService.findByUserId(user_id)
  }

  @ApiOperation({ summary: 'Remove favorito do usuário autenticado' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Favorito removido com sucesso',
    schema: { example: { message: 'Favorito removido com sucesso' } }
  })
  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @Req() req: Request
  ): Promise<{ message: string }> {
    const user = req.user as { sub: string }
    if (!user || !user.sub) {
      throw new Error('Usuário não autenticado ou token JWT inválido')
    }
    await this.favoritesService.removeByIdAndUser(id, String(user.sub))
    return { message: 'Favorito removido com sucesso' }
  }
}
