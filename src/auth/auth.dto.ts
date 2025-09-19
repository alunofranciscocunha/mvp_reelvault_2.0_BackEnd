import { ApiProperty } from '@nestjs/swagger'

export class AuthResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  token: string

  @ApiProperty({
    example: 3600,
    description: 'Tempo de expiração do token em segundos'
  })
  expiresIn: number
}
