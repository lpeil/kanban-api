import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardDto } from './dtos/cards.dto';

import { Card } from './interfaces/card.interface';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardService: CardsService) {}

  @Get()
  async listCards(): Promise<Card[]> {
    return this.cardService.listCards();
  }

  @Get('/:slug')
  async getCard(@Param('slug') slug: string): Promise<Card> {
    return this.cardService.getCard(slug);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createCard(@Body() CardDto: CardDto) {
    return this.cardService.createCard(CardDto);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteCard(@Param('id') id: string) {
    return await this.cardService.deleteCard(id);
  }
}
