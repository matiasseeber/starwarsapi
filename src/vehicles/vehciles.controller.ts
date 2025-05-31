import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { VehiclesService } from './vehicles.service';
import { GenericFilterDto } from 'src/shared/models/dtos/filter-generic';
import { GenericEntity } from 'src/shared/models/entities/generic.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('vehicles')
@ApiTags('vehicles')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class VehiclesController {
    constructor(private readonly service: VehiclesService) { }

    @Get()
    @ApiCreatedResponse({ type: GenericEntity }) 
    async findAll(@Query() data: GenericFilterDto) {
        return this.service.findAll(data);
    }
}
