import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardSchema } from './interfaces/card.schema';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Card', schema: CardSchema }])],
  providers: [CardsService],
  controllers: [CardsController],
})
export class CardsModule {}
