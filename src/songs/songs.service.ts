import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Injectable()
export class SongsService {
  create(createSongDto: CreateSongDto) {
    return 'This action adds a new songs';
  }

  findAll() {
    return `This action returns all songs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} songs`;
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return `This action updates a #${id} songs`;
  }

  remove(id: number) {
    return `This action removes a #${id} songs`;
  }

  findFree() {
    return `This action returns all free songs`;
  }

  getTopSongs(count: number = 10) {
    return `This action returns all songs with top ${count} rating`;
  }
}
