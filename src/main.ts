import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('ReelVault 2.0 API')
    .setDescription(
      'API para autenticação, favoritos e comentários de filmes.\n\n' +
        '⚠️ **IMPORTANTE:** Para testar as rotas protegidas, faça login em `/auth/login` e clique em "Authorize" no topo da página do Swagger, colando o token JWT retornado no formato: `Bearer <token>`.'
    )
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT-auth'
    )
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  const PORT = process.env.PORT ?? 4000

  await app.listen(PORT)
  console.log(`Aplicação rodando em: http://localhost:${PORT}`)
  console.log(`Swagger disponível em: http://localhost:${PORT}/swagger`)
}
bootstrap()
