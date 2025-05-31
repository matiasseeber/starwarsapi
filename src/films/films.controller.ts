import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { FilmsService } from './films.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { FilmEntity } from './entities/film.entity';
import { CreateFilmDto } from './dtos/create-film.dto';
import { FilmFilterDto } from './dtos/film-filter.dto';

@Controller('films')
@ApiTags('films')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class FilmsController {
    constructor(private readonly service: FilmsService) { }

    @Get()
    @ApiCreatedResponse({ type: FilmEntity })
    async findAll(@Query() data: FilmFilterDto) {
        return this.service.findAll(data);
    }

    @Get(':id')
    @ApiCreatedResponse({ type: FilmEntity })
    async findOne(@Param('id') id: number) {
        return this.service.findOne({ id });
    }

    @Post()
    @ApiCreatedResponse({ type: FilmEntity })
    async create(@Body() data: CreateFilmDto) {
        return this.service.create(data);
    }
}
