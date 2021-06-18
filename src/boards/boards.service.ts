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

  async getBoard(id: string): Promise<Board> {
    return await this.findBoard(id);
  }

  async createBoard(boardDto: BoardDto): Promise<Board> {
    return this.board.create(boardDto);
  }

  async deleteBoard(id: string): Promise<void> {
    await this.findBoard(id);

    await this.board.deleteOne({ _id: id }).exec();
  }

  async findBoard(id: string) {
    let board: Board;

    try {
      board = await this.board.findOne({ _id: id }).exec();
    } catch (err) {
      throw new BadRequestException(`${id} is not a valid id`);
    }

    if (!board) {
      throw new NotFoundException(`Board ${id} not found`);
    }

    return board;
  }
}
