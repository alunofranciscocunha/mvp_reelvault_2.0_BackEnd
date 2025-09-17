import {
  IsUUID,
  IsInt,
  IsOptional,
  IsString,
  Min,
  IsNotEmpty
} from 'class-validator'

export class FavoritesDto {
  @IsUUID()
  @IsOptional() // será preenchido pelo backend
  user_id: string

  @IsInt()
  @Min(1)
  movie_id: number

  @IsString()
  @IsOptional()
  poster_path?: string

  @IsString()
  @IsNotEmpty()
  title: string
}
