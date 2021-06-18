import { IsNotEmpty, IsString } from 'class-validator';
import { IconDto } from './icon.dto';

export class BoardDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  slug: string;

  @IsNotEmpty()
  readonly icon: IconDto;
}
