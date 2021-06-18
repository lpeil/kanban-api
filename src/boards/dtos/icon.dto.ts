import { IsNotEmpty, IsHexColor, IsString } from 'class-validator';

export class IconDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsHexColor()
  readonly color: string;
}
