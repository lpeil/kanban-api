import { IsNotEmpty, IsString } from 'class-validator';

export class CardDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
