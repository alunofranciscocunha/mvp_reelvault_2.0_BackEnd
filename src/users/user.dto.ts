import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
  @ApiProperty({ example: 'uuid-gerado-pelo-backend', readOnly: true })
  id: string

  @ApiProperty({ example: 'usuario1' })
  username: string

  @ApiProperty({ example: 'senha123', writeOnly: true })
  password: string
}
