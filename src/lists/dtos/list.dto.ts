import { IsNotEmpty, IsHexColor, IsUUID } from 'class-validator';

export class ListDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsHexColor()
  readonly color: string;

  @IsNotEmpty()
  @IsUUID()
  readonly board: string;
}
