import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songsService.create(createSongDto);
  }

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Get('top')
  getTopSongs(@Query('count') count: string) {
    const topCount = count ? parseInt(count) : 10;
    return this.songsService.getTopSongs(topCount);
  }

  @Get('free')
  findFree() {
    return this.songsService.findFree();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    return this.songsService.update(+id, updateSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songsService.remove(+id);
  }

}