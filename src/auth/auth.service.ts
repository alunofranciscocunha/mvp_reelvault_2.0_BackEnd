import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import { compareSync as bcryptCompareSync } from 'bcrypt'
import { ConfigService } from '@nestjs/config'
import { AuthResponseDto } from './auth.dto'

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    this.jwtExpirationTimeInSeconds = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
      3600
    )
  }

  async signIn(username: string, password: string): Promise<AuthResponseDto> {
    const foundUser = await this.usersService.findByUserName(username)

    if (
      !foundUser ||
      !bcryptCompareSync(
        password,
        foundUser.password
      ) /* compara os hash se for false ele nao authentica */
    ) {
      throw new UnauthorizedException('Invalid username or password')
    }

    const payload = {
      sub: foundUser.id /* sempre recomendado usar o parametro sub para o id do user */,
      username: foundUser.username,
    }

    const token = this.jwtService.sign(payload)

    return { token, expiresIn: this.jwtExpirationTimeInSeconds }
  }
}
