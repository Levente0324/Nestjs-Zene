import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, MinLength } from 'class-validator';

/**
 * The data required to create a new song
 */
export class CreateSongDto {
  /**
   * The name of the song
   */
  @IsString()
  @MinLength(1)
  @ApiProperty({
    example: 'Never Gonna Give You Up',
  })
  cim: string;

  /**
   * The author of the song
   */
  @IsString()
  @MinLength(1)
  @ApiProperty({
    example: 'Rick Astley',
  })
  szerzo: string;

  /**
   * The length of the song in seconds
   */
  @IsInt()
  @IsPositive()
  @ApiProperty({
    example: 213,
  })
  hossz: number;

  /**
   * The year of release of the song
   */
  @IsInt()
  @IsPositive()
  @ApiProperty({
    example: 1987,
  })
  ar: number;
}
