import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SpeciesService } from './species.service';
import { GenericFilterDto } from 'src/shared/models/dtos/filter-generic';
import { GenericEntity } from 'src/shared/models/entities/generic.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('species')
@ApiTags('species')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class SpeciesController {
    constructor(private readonly service: SpeciesService) { }

    @Get()
    @ApiCreatedResponse({ type: GenericEntity }) 
    async findAll(@Query() data: GenericFilterDto) {
        return this.service.findAll(data);
    }
}
