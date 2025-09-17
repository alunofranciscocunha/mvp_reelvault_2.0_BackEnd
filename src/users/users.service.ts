import { ConflictException, Injectable } from '@nestjs/common'
import { UserDto } from './user.dto'
import { hashSync as bcryptHashSync } from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UsersEntity } from 'src/db/entities/users.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>
  ) {}

  async create(newUser: UserDto) {
    const userAlreadyRegistered = await this.findByUserName(newUser.username)

    if (userAlreadyRegistered) {
      throw new ConflictException(
        ` User '${newUser.username}' already registered`
      )
    }

    const dbUser = new UsersEntity()
    dbUser.username = newUser.username
    dbUser.password_hash = bcryptHashSync(newUser.password, 10)

    const { id, username } = await this.usersRepository.save(dbUser)

    return { id, username }
  }

  async findByUserName(username: string): Promise<UserDto | null> {
    const userFound = await this.usersRepository.findOne({
      where: { username },
    })

    if (!userFound) {
      return null
    }

    return {
      id: userFound.id,
      username: userFound.username,
      password: userFound.password_hash,
    }
  }
}
