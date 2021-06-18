import { IsNotEmpty } from 'class-validator';

export class ListDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly color: string;
}
