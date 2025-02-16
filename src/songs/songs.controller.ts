import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Songs')
@Controller('songs')
@ApiBearerAuth()
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  /**
   * Add a new song to the database
   * @param createSongDto
   * @returns JSON response
   */
  @ApiParam({ name: 'Song to add', type: CreateSongDto })
  @ApiCreatedResponse({ description: 'Song has been successfully added' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songsService.create(createSongDto);
  }

  /**
   * Get all songs from the database
   * @returns JSON response
   */
  @ApiOkResponse({ description: 'List of all songs retrieved successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  /**
   * Get top rated songs
   * @param count Number of songs to return
   * @returns JSON response of top rated songs
   */
  @ApiOkResponse({
    description: 'List of top rated songs retrieved successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiQuery({
    name: 'count',
    required: false,
    type: Number,
    description: 'Number of top songs to return (default: 10)',
  })
  @Get('top')
  getTopSongs(@Query('count') count: string) {
    const topCount = count ? parseInt(count) : 10;
    return this.songsService.getTopSongs(topCount);
  }

  /**
   * Get all free songs
   * @returns JSON response of free songs
   */
  @ApiOkResponse({ description: 'List of free songs retrieved successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get('free')
  findFree() {
    return this.songsService.findFree();
  }

  /**
   * Get a specific song by ID
   * @param id Song ID
   * @returns Single song object
   */
  @ApiOkResponse({ description: 'Song retrieved successfully' })
  @ApiBadRequestResponse({ description: 'Invalid ID supplied' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Song ID',
    required: true,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(Number(id));
  }

  /**
   * Update a song by ID
   * @param id Song ID
   * @param updateSongDto Song you want to update
   * @returns Updated song object
   */
  @ApiOkResponse({ description: 'Song updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input supplied' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Song ID',
    required: true,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    return this.songsService.update(+id, updateSongDto);
  }

  /**
   * Delete a song by ID
   * @param id Song ID
   * @returns Operation status
   */
  @ApiOkResponse({ description: 'Song deleted successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid ID supplied' })
  @ApiParam({ name: 'id', type: Number, description: 'Song ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songsService.remove(+id);
  }
}
