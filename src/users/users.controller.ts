import { Body, Controller, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { UserDto } from './user.dto'
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Cadastro de usuário' })
  @ApiBody({
    type: UserDto,
    examples: {
      exemplo: {
        value: { username: 'usuario1', password: 'senha123' }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    schema: {
      example: { id: 'uuid-gerado', username: 'usuario1' }
    }
  })
  @Post()
  async create(@Body() user: UserDto) {
    return this.usersService.create(user)
  }
}
