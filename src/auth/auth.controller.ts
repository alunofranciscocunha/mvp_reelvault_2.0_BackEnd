import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { AuthResponseDto } from './auth.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login e obtenção do JWT' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'usuario1' },
        password: { type: 'string', example: 'senha123' }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Token JWT retornado com sucesso',
    type: AuthResponseDto
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body('username') username: string,
    @Body('password') password: string
  ): Promise<AuthResponseDto> {
    const result = await this.authService.signIn(username, password)
    if (result instanceof Error) {
      throw new Error('Authenticação falhou')
    }
    return result
  }
}
