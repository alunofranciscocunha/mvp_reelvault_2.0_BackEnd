import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CommentsEntity } from '../db/entities/comments.entity'
import { CommentsDto } from './comments.dto'

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsEntity)
    private readonly commentsRepository: Repository<CommentsEntity>
  ) {}

  async create(dto: CommentsDto): Promise<CommentsEntity> {
    const comment = this.commentsRepository.create(dto)
    return this.commentsRepository.save(comment)
  }

  async findByMovieId(movie_id: number): Promise<CommentsEntity[]> {
    return this.commentsRepository.find({ where: { movie_id } })
  }

  async update(id: number, dto: CommentsDto): Promise<CommentsEntity> {
    await this.commentsRepository.update(id, dto)
    const updated = await this.commentsRepository.findOne({
      where: { id: String(id) }
    })
    if (!updated) {
      throw new Error(`Comment with id ${id} not found`)
    }
    return updated
  }

  async remove(id: number): Promise<void> {
    await this.commentsRepository.delete(id)
  }
}
