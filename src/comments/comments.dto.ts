import {
  IsUUID,
  IsInt,
  IsString,
  IsNotEmpty,
  Min,
  Max,
  IsBoolean,
  IsOptional
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CommentsDto {
  @ApiProperty({ example: 'uuid-do-usuario', required: false })
  @IsUUID()
  @IsOptional()
  user_id: string

  @ApiProperty({ example: 123, required: true })
  @IsInt()
  @Min(1)
  movie_id: number

  @ApiProperty({ example: 'Ótimo filme!' })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({ example: 'Gostei muito.' })
  @IsString()
  @IsNotEmpty()
  content: string

  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number

  @ApiProperty({ example: true })
  @IsBoolean()
  isrecommended: boolean

  @ApiPropertyOptional({ example: 'usuario1' })
  @IsString()
  @IsOptional()
  user_name?: string
}
