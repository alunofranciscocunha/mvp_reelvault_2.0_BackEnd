import {
  IsUUID,
  IsInt,
  IsOptional,
  IsString,
  Min,
  IsNotEmpty
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class FavoritesDto {
  @ApiProperty({
    example: 'uuid-do-usuario',
    description: 'ID do usuário',
    required: false
  })
  @IsUUID()
  @IsOptional() // será preenchido pelo backend
  user_id: string

  @ApiProperty({ example: 123, description: 'ID do filme' })
  @IsInt()
  @Min(1)
  movie_id: number

  @ApiPropertyOptional({
    example: '/poster/path.jpg',
    description: 'Caminho do poster do filme'
  })
  @IsString()
  @IsOptional()
  poster_path?: string

  @ApiProperty({ example: 'O Poderoso Chefão', description: 'Título do filme' })
  @IsString()
  @IsNotEmpty()
  title: string
}
