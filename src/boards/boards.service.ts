import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ListsService } from 'src/lists/lists.service';
import { BoardDto } from './dtos/board.dto';
import { Board } from './interfaces/board.interface';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel('Board') private readonly board: Model<Board>,
    private readonly listsService: ListsService,
  ) {}

  async listBoards(): Promise<Board[]> {
    return await this.board.find().populate('list').exec();
  }

  async getBoard(slug: string): Promise<Board> {
    let board: Board;

    try {
      board = await this.board.findOne({ slug: slug }).populate('list').exec();
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

    const board = await this.board.create(boardDto);
    await this.createBoardLists(board._id);

    return board;
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

  async addListToBoard(id: string, listId: string): Promise<void> {
    const board = await this.board.findOne({ _id: id }).exec();

    board.list.push(listId);
    board.save();
  }

  async createBoardLists(boardId: string): Promise<void> {
    const defaultLists = [
      { name: 'Backlog', color: '#DEDEDB', board: boardId },
      { name: 'Not Started', color: '#FFCCD1', board: boardId },
      { name: 'In Progress', color: '#EEE1BF', board: boardId },
      { name: 'Finished', color: '#BFDAD4', board: boardId },
    ];

    defaultLists.forEach(async (list) => {
      await this.listsService.createList(list);
    });
  }
}
