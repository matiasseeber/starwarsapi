import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { StarshipsService } from './starships.service';
import { GenericFilterDto } from 'src/shared/models/dtos/filter-generic';
import { GenericEntity } from 'src/shared/models/entities/generic.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('starships')
@ApiTags('starships')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class StarshipsController {
    constructor(private readonly service: StarshipsService) { }

    @Get()
    @ApiCreatedResponse({ type: GenericEntity }) 
    async findAll(@Query() data: GenericFilterDto) {
        return this.service.findAll(data);
    }
}
