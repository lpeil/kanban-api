import { IsNotEmpty } from 'class-validator';
import { IconDto } from './icon.dto';

export class BoardDto {
  @IsNotEmpty()
  readonly name: string;

  slug: string;

  @IsNotEmpty()
  readonly icon: IconDto;
}
