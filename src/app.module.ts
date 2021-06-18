// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardsModule } from './boards/boards.module';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    BoardsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
