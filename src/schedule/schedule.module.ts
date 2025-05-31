import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleService } from './schedule.service';
import { StarWarsModule } from 'src/integrations/starwars/starwars.module';
import { VehiclesModule } from 'src/vehicles/vehicles.module';
import { StarshipsModule } from 'src/starships/starships.module';
import { SpeciesModule } from 'src/species/species.module';
import { PlanetsModule } from 'src/planets/planets.module';
import { PeopleModule } from 'src/people/people.module';
import { FilmsModule } from 'src/films/films.module';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        StarWarsModule,
        VehiclesModule,
        StarshipsModule,
        SpeciesModule,
        PlanetsModule,
        PeopleModule,
        FilmsModule,
    ],
    providers: [ScheduleService],
})
export class ScheduleOrchestratorModule { }
