import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany
} from 'typeorm'
import { CommentsEntity } from './comments.entity'
import { FavoritesEntity } from './favorites.entity'

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', unique: true })
  username: string

  @Column({ type: 'varchar' })
  password_hash: string

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @OneToMany(() => CommentsEntity, (comment) => comment.user)
  comments: CommentsEntity[]

  @OneToMany(() => FavoritesEntity, (favorite) => favorite.user)
  favorites: FavoritesEntity[]
}
