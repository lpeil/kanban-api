import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ListSchema } from './interfaces/list.schema';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'List', schema: ListSchema }])],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
