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
import { BoardsService } from './boards.service';
import { BoardDto } from './dtos/board.dto';

import { Board } from './interfaces/board.interface';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {}

  @Get()
  async listBoards(): Promise<Board[]> {
    return this.boardService.listBoards();
  }

  @Get('/:slug')
  async getBoard(@Param('slug') slug: string): Promise<Board> {
    return this.boardService.getBoard(slug);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createBoard(@Body() boardDto: BoardDto) {
    return this.boardService.createBoard(boardDto);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteBoard(@Param('id') id: string) {
    return await this.boardService.deleteBoard(id);
  }
}
