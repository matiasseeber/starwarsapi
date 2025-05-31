import { CreateGenericDto } from "../dtos/create-generic";
import { GenericFilterDto } from "../dtos/filter-generic";
import { GenericEntity } from "../entities/generic.entity";

export interface GenericService {
    createMany(data: CreateGenericDto[]): Promise<GenericEntity[]>;
    findAll(filter: GenericFilterDto): Promise<GenericEntity[]>;
}