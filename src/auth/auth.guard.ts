import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  private jwtSecret: string

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    const jwtSecret = this.configService.get<string>('JWT_SECRET')
    if (!jwtSecret) {
      throw new Error('JWT_SECRET não está definido em variáveis ​​de ambiente')
    }
    this.jwtSecret = jwtSecret
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException('Unauthorized')
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtSecret
      })

      request['user'] = payload 
    } catch {
      throw new UnauthorizedException('Unauthorized')
    }

    return true // se nao caiu em nenhuma das excecoes acima, é porque o usuario esta autenticado
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
