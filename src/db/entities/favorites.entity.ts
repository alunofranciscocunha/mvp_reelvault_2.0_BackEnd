import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  Unique,
  JoinColumn
} from 'typeorm'
import { UsersEntity } from './users.entity'

@Entity({ name: 'favorites' })
@Unique(['user_id', 'movie_id'])
export class FavoritesEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'uuid' })
  user_id: string

  @Column({ type: 'integer' })
  movie_id: number

  @Column({ type: 'varchar', nullable: true })
  poster_path: string

  @Column({ type: 'varchar' })
  title: string

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @ManyToOne(() => UsersEntity, (user) => user.favorites, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity
}
