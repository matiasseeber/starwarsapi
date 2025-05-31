import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { FilmsService } from './films.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { FilmEntity } from './entities/film.entity';
import { CreateFilmDto } from './dtos/create-film.dto';
import { FilmFilterDto } from './dtos/film-filter.dto';
import { UpdateFilmDto } from './dtos/update-film.dto';

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
    async findOne(@Param('id') id: number, @Req() req) {
        if (req.decoded.is_admin)
            throw new UnauthorizedException("You are not authorized to access this resource");

        return this.service.findOne({ id });
    }

    @Post()
    @ApiCreatedResponse({ type: FilmEntity })
    async create(@Body() data: CreateFilmDto, @Req() req) {
        if (!req.decoded.is_admin)
            throw new UnauthorizedException("You are not authorized to access this resource");
        return this.service.create(data);
    }

    @Put(':id')
    @ApiCreatedResponse({ type: FilmEntity })
    async update(@Param('id') id: number, @Body() data: UpdateFilmDto, @Req() req) {
        if (!req.decoded.is_admin)
            throw new UnauthorizedException("You are not authorized to access this resource");
        return this.service.update(id, data);
    }

    @Delete(':id')
    @ApiCreatedResponse({ type: FilmEntity })
    async delete(@Param('id') id: number, @Req() req) {
        if (!req.decoded.is_admin)
            throw new UnauthorizedException("You are not authorized to access this resource");
        return this.service.update(id, {
            active: false
        });
    }
}
