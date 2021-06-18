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
import { ListDto } from './dtos/list.dto';
import { List } from './interfaces/list.interface';
import { ListsService } from './lists.service';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  async listBoards(): Promise<List[]> {
    return this.listsService.listLists();
  }

  @Get('/:id')
  async getBoard(@Param('id') id: string): Promise<List> {
    return this.listsService.getList(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createBoard(@Body() listDto: ListDto) {
    return this.listsService.createList(listDto);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteBoard(@Param('id') id: string) {
    return await this.listsService.deleteList(id);
  }
}
