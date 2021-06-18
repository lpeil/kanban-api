import { IsNotEmpty, IsHexColor } from 'class-validator';

export class ListDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsHexColor()
  readonly color: string;
}
