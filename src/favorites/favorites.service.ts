import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FavoritesEntity } from '../db/entities/favorites.entity'
import { FavoritesDto } from './favorites.dto'

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private readonly favoritesRepository: Repository<FavoritesEntity>
  ) {}

  async create(dto: FavoritesDto): Promise<FavoritesEntity> {
    const favorite = this.favoritesRepository.create(dto)
    return this.favoritesRepository.save(favorite)
  }

  async remove(id: number): Promise<void> {
    await this.favoritesRepository.delete(id)
  }

  async removeByUserAndMovie(user_id: string, movie_id: number): Promise<void> {
    await this.favoritesRepository.delete({ user_id, movie_id })
  }

  async removeByIdAndUser(id: number, user_id: string): Promise<void> {
    await this.favoritesRepository.delete({ id, user_id })
  }

  async findByUserId(user_id: string): Promise<FavoritesEntity[]> {
    return this.favoritesRepository.find({ where: { user_id } })
  }
}
