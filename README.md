# Backend ReelVault 2.0 - NestJS

Este projeto é uma API backend desenvolvida com [NestJS](https://nestjs.com/), um framework Node.js para construção de aplicações escaláveis e eficientes.

## Sumário

- [Visão Geral](#visão-geral)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Funciona o NestJS](#como-funciona-o-nestjs)
  - [Modules](#modules)
  - [Controllers](#controllers)
  - [Services](#services)
  - [Entities](#entities)
  - [DTOs](#dtos)
  - [Guards (Autenticação)](#guards-autenticação)
- [Rotas Principais](#rotas-principais)
- [Exemplos de Uso das Rotas de Comentários](#exemplos-de-uso-das-rotas-de-comentários)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Testes](#testes)
- [Migrations](#migrations)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Docker](#docker)
- [Referências](#referências)

---

## Visão Geral

A API ReelVault 2.0 oferece endpoints para autenticação de usuários, gerenciamento de favoritos e comentários de filmes, utilizando PostgreSQL como banco de dados e JWT para autenticação.

---

## Estrutura do Projeto

```
src/
  ├── app.module.ts         # Módulo principal
  ├── app.controller.ts     # Controller principal (rota raiz)
  ├── app.service.ts        # Service principal
  ├── auth/                 # Autenticação (JWT)
  ├── comments/             # Comentários de filmes
  ├── favorites/            # Favoritos de filmes
  ├── users/                # Usuários
  └── db/                   # Configuração e entidades do banco de dados
```

---

## Como Funciona o NestJS

### Modules

- **O que são:** Agrupam controllers, services e providers relacionados.
- **Exemplo:** `UsersModule`, `AuthModule`, `CommentsModule`, etc.
- **Arquivo:** `src/users/users.module.ts`

### Controllers

- **O que são:** Responsáveis por receber as requisições HTTP, tratar rotas e delegar lógica para os services.
- **Exemplo:** `UsersController` recebe requisições para `/users`.
- **Arquivo:** `src/users/users.controller.ts`

### Services

- **O que são:** Contêm a lógica de negócio e manipulação de dados. São injetados nos controllers.
- **Exemplo:** `UsersService` faz operações de CRUD no usuário.
- **Arquivo:** `src/users/users.service.ts`

### Entities

- **O que são:** Representam as tabelas do banco de dados (ORM).
- **Exemplo:** `UsersEntity`, `FavoritesEntity`, `CommentsEntity`.
- **Arquivo:** `src/db/entities/users.entity.ts`

### DTOs

- **O que são:** Data Transfer Objects. Definem o formato dos dados recebidos/enviados nas requisições.
- **Exemplo:** `UserDto`, `FavoritesDto`, `CommentsDto`.
- **Arquivo:** `src/users/user.dto.ts`

### Guards (Autenticação)

- **O que são:** Interceptam requisições para verificar autenticação/autorização.
- **Exemplo:** `AuthGuard` valida o JWT.
- **Arquivo:** `src/auth/auth.guard.ts`

---

## Rotas Principais

| Método | Rota                        | Descrição                        | Autenticado? |
|--------|-----------------------------|----------------------------------|--------------|
| POST   | `/auth/login`               | Login e obtenção do JWT          | Não          |
| POST   | `/users`                    | Cadastro de usuário              | Não          |
| POST   | `/favorites`                | Adiciona filme aos favoritos     | Sim          |
| GET    | `/favorites/user/:user_id`  | Lista favoritos do usuário       | Sim          |
| DELETE | `/favorites/:id`            | Remove favorito                  | Sim          |
| POST   | `/comments`                 | Adiciona comentário              | Sim          |
| GET    | `/comments/:movie_id`       | Lista comentários do filme       | Não          |
| PUT    | `/comments/:id`             | Atualiza comentário              | Sim          |
| DELETE | `/comments/:id`             | Remove comentário                | Sim          |

---

## Exemplos de Uso das Rotas de Comentários

- **GET /comments/:movie_id** (Público)
  ```bash
  curl http://localhost:4000/comments/123
  ```

- **POST /comments** (Requer JWT)
  ```bash
  curl -X POST http://localhost:4000/comments \
    -H "Authorization: Bearer <token>" \
    -H "Content-Type: application/json" \
    -d '{"movie_id":123,"title":"Ótimo filme!","content":"Gostei muito.","rating":5,"isrecommended":true}'
  ```

- **PUT /comments/:id** (Requer JWT)
  ```bash
  curl -X PUT http://localhost:4000/comments/<comment_id> \
    -H "Authorization: Bearer <token>" \
    -H "Content-Type: application/json" \
    -d '{"title":"Atualizado!","content":"Novo conteúdo.","rating":4,"isrecommended":false}'
  ```

- **DELETE /comments/:id** (Requer JWT)
  ```bash
  curl -X DELETE http://localhost:4000/comments/<comment_id> \
    -H "Authorization: Bearer <token>"
  ```

---

## Como Rodar o Projeto

### 1. Pré-requisitos

- Node.js 20+
- PostgreSQL
- Docker (opcional)

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie `.env.example` para `.env` e preencha os valores.

### 4. Rode as migrations

```bash
npm run migration:run
```

### 5. Inicie o servidor

```bash
npm run start:dev
```

A API estará disponível em `http://localhost:4000`.

---

## Testes

- **Unitários:** `npm run test`
- **E2E:** `npm run test:e2e`
- **Cobertura:** `npm run test:cov`

---

## Migrations

- Criar migration:  
  `npm run migration:create --name=nome-da-migration`
- Rodar migrations:  
  `npm run migration:run`
- Reverter última migration:  
  `npm run migration: revert`

---

## Variáveis de Ambiente

Veja o arquivo `.env.example` para todos os parâmetros necessários:

```
JWT_SECRET=
JWT_EXPIRATION_TIME=
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
```

---

## Docker

Para rodar com Docker Compose (backend + banco):

```bash
docker-compose up --build
```

---

## Referências

- [Documentação oficial NestJS](https://docs.nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [Class Validator](https://github.com/typestack/class-validator)
- [JWT](https://jwt.io/)

---
