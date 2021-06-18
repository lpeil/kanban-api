import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardsModule } from 'src/boards/boards.module';
import { ListSchema } from './interfaces/list.schema';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'List', schema: ListSchema }]),
    forwardRef(() => BoardsModule),
  ],
  controllers: [ListsController],
  providers: [ListsService],
  exports: [ListsService],
})
export class ListsModule {}
