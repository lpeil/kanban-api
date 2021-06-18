import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BoardDto } from './dtos/board.dto';
import { Board } from './interfaces/board.interface';

@Injectable()
export class BoardsService {
  constructor(@InjectModel('Board') private readonly board: Model<Board>) {}

  async listBoards(): Promise<Board[]> {
    return await this.board.find().exec();
  }

  async getBoard(slug: string): Promise<Board> {
    let board;

    try {
      board = await this.board.findOne({ slug: slug }).exec();
    } catch (err) {
      throw new BadRequestException(`${slug} is not a valid path`);
    }

    if (!board) {
      throw new NotFoundException(`Board ${slug} not found`);
    }

    return board;
  }

  async createBoard(boardDto: BoardDto): Promise<Board> {
    boardDto.slug = boardDto.name
      .replace(/[^A-Z0-9]/gi, '-')
      .toLocaleLowerCase();

    return this.board.create(boardDto);
  }

  async deleteBoard(id: string): Promise<void> {
    try {
      if (!(await this.board.findOne({ _id: id }).exec())) {
        throw new NotFoundException(`Board ${id} not found`);
      }
    } catch (err) {
      throw new BadRequestException(`${id} is not a valid id`);
    }

    await this.board.deleteOne({ _id: id }).exec();
  }
}
