import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CardDto } from './dtos/cards.dto';
import { Card } from './interfaces/card.interface';

@Injectable()
export class CardsService {
  constructor(@InjectModel('Card') private readonly card: Model<Card>) {}

  async listCards(): Promise<Card[]> {
    return await this.card.find().exec();
  }

  async getCard(slug: string): Promise<Card> {
    let card: Card;

    try {
      card = await this.card.findOne({ slug: slug }).exec();
    } catch (err) {
      throw new BadRequestException(`${slug} is not a valid path`);
    }

    if (!card) {
      throw new NotFoundException(`Card ${slug} not found`);
    }

    return card;
  }

  async createCard(cardDto: CardDto): Promise<Card> {
    return this.card.create(cardDto);
  }

  async deleteCard(id: string): Promise<void> {
    try {
      if (!(await this.card.findOne({ _id: id }).exec())) {
        throw new NotFoundException(`Card ${id} not found`);
      }
    } catch (err) {
      throw new BadRequestException(`${id} is not a valid id`);
    }

    await this.card.deleteOne({ _id: id }).exec();
  }
}
