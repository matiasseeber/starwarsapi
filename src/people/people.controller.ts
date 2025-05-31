import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PeopleService } from './people.service';
import { GenericFilterDto } from 'src/shared/models/dtos/filter-generic';
import { GenericEntity } from 'src/shared/models/entities/generic.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('people')
@ApiTags('people')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class SpeciesController {
    constructor(private readonly service: PeopleService) { }

    @Get()
    @ApiCreatedResponse({ type: GenericEntity })
    async findAll(@Query() data: GenericFilterDto) {
        return this.service.findAll(data);
    }
}
