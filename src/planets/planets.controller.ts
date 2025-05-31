import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PlanetsService } from './planets.service';
import { GenericFilterDto } from 'src/shared/models/dtos/filter-generic';
import { GenericEntity } from 'src/shared/models/entities/generic.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('planets')
@ApiTags('planets')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class PlanetsController {
    constructor(private readonly service: PlanetsService) { }

    @Get()
    @ApiCreatedResponse({ type: GenericEntity })
    async findAll(@Query() data: GenericFilterDto) {
        return this.service.findAll(data);
    }
}
