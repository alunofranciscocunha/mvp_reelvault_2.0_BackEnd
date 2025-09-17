import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { UsersEntity } from './users.entity'

@Entity({ name: 'comments' })
export class CommentsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid' })
  user_id: string

  @Column({ type: 'integer' })
  movie_id: number

  @Column({ type: 'varchar' })
  title: string

  @Column({ type: 'text' })
  content: string

  @Column({ type: 'integer' })
  rating: number

  @Column({ type: 'boolean' })
  isrecommended: boolean

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @Column({ type: 'varchar', nullable: true })
  user_name: string

  @ManyToOne(() => UsersEntity, (user) => user.comments, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity
}
