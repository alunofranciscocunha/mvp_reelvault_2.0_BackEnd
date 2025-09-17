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

declare module 'express' {
  interface Request {
    user?: any
  }
}

@UseGuards(AuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

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

  @Get('user/:user_id')
  async getByUser(
    @Param('user_id') user_id: string
  ): Promise<FavoritesEntity[]> {
    return this.favoritesService.findByUserId(user_id)
  }

  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @Req() req: Request
  ): Promise<{ message: string }> {
    const user = req.user as { sub: string }
    if (!user || !user.sub) {
      throw new Error('Usuário não autenticado ou token JWT inválido')
    }
    // Opcional: você pode garantir que o favorito pertence ao usuário antes de remover
    await this.favoritesService.removeByIdAndUser(id, String(user.sub))
    return { message: 'Favorito removido com sucesso' }
  }
}
