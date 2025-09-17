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

export class CommentsDto {
  @IsUUID()
  @IsOptional()
  user_id: string

  @IsInt()
  @Min(1)
  movie_id: number

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number

  @IsBoolean()
  isrecommended: boolean

  @IsString()
  @IsOptional()
  user_name?: string
}
