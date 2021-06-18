import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardSchema } from './interfaces/board.schema';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { ListsModule } from 'src/lists/lists.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Board', schema: BoardSchema }]),
    ListsModule,
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: [BoardsService],
})
export class BoardsModule {}
