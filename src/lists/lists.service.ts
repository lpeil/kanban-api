import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BoardsService } from 'src/boards/boards.service';
import { ListDto } from './dtos/list.dto';
import { List } from './interfaces/list.interface';

@Injectable()
export class ListsService {
  constructor(
    @InjectModel('List') private readonly list: Model<List>,
    @Inject(forwardRef(() => BoardsService))
    private readonly boardService: BoardsService,
  ) {}

  async listLists(): Promise<List[]> {
    return await this.list.find().exec();
  }

  async getList(id: string): Promise<List> {
    let list: List;

    try {
      list = await this.list.findOne({ _id: id }).exec();
    } catch (err) {
      throw new BadRequestException(`${id} is not a valid id`);
    }

    if (!list) {
      throw new NotFoundException(`List ${id} not found`);
    }

    return list;
  }

  async createList(listDto: ListDto): Promise<List> {
    const list = await this.list.create({
      name: listDto.name,
      color: listDto.color,
    });

    await this.boardService.addListToBoard(listDto.board, list._id);

    return list;
  }

  async deleteList(id: string): Promise<void> {
    try {
      if (!(await this.list.findOne({ _id: id }).exec())) {
        throw new NotFoundException(`List ${id} not found`);
      }
    } catch (err) {
      throw new BadRequestException(`${id} is not a valid id`);
    }

    await this.list.deleteOne({ _id: id }).exec();
  }
}
