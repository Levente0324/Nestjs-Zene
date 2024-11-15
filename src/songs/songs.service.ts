import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SongsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSongDto: CreateSongDto) {
    return this.prisma.song.create({
      data: {
        cim: createSongDto.cim,
        szerzo: createSongDto.szerzo,
        hossz: createSongDto.hossz,
        ar: createSongDto.ar,
        rating: Math.floor(Math.random() * 10) + 1,
    }})
  }

  findAll() {
    return this.prisma.song.findMany();
  }

  findOne(id: number) {
    return this.prisma.song.findFirst({
      where: {
        id: id,
      }
    });
  }
  

  update(id: number, updateSongDto: UpdateSongDto) {
    return this.prisma.song.update({
      where: {
        id: id,
      },
      data: {
        cim: updateSongDto.cim,
        szerzo: updateSongDto.szerzo,
        hossz: updateSongDto.hossz,
        ar: updateSongDto.ar,
      },
    });
  }

  remove(id: number) {
    return this.prisma.song.delete({where: {id:id}});
  }

  findFree() {
    return this.prisma.song.findMany({where: {ar: {equals: 0}}});
  }

  getTopSongs(count: number = 10) {
    return this.prisma.song.findMany({
      orderBy: {
        rating: 'desc', 
      },
      take: count,
    });
  }
}

