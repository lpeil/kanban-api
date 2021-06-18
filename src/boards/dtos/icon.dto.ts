import { IsNotEmpty } from 'class-validator';

export class IconDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly color: string;
}
