import { Injectable } from '@nestjs/common';
import { VehiclesRepository } from './vehicles.repository';
import { CreateGenericDto } from 'src/shared/models/dtos/create-generic';
import { GenericFilterDto } from 'src/shared/models/dtos/filter-generic';
import { GenericService } from 'src/shared/models/interfaces/generic-service';

@Injectable()
export class VehiclesService implements GenericService {
    constructor(
        private repository: VehiclesRepository,
    ) { }

    public createMany = async (data: CreateGenericDto[]) =>
        this.repository.createMany(data);

    async findAll(filter: GenericFilterDto) {
        return this.repository.findAll(filter);
    }
}