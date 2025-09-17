import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesEntity } from 'src/db/entities/favorites.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesController } from './favorites.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FavoritesEntity])],
  controllers: [FavoritesController],
  providers: [FavoritesService]
})
export class FavoritesModule {}
