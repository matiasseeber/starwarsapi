import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateFilmDto } from 'src/films/dtos/create-film.dto';
import { FilmsService } from 'src/films/films.service';
import { Result } from 'src/integrations/starwars/entities/response.entity';
import { StarWarsService } from 'src/integrations/starwars/starwars.service';
import { PeopleService } from 'src/people/people.service';
import { PlanetsService } from 'src/planets/planets.service';
import { CreateGenericDto } from 'src/shared/models/dtos/create-generic';
import { GenericEntity } from 'src/shared/models/entities/generic.entity';
import { GenericService } from 'src/shared/models/interfaces/generic-service';
import { SpeciesService } from 'src/species/species.service';
import { StarshipsService } from 'src/starships/starships.service';
import { VehiclesService } from 'src/vehicles/vehicles.service';

@Injectable()
export class ScheduleService implements OnModuleInit {
  // should implement sync based on last sync date
  private last_sync: Date | null = null;

  constructor(
    private readonly starWarsService: StarWarsService,
    private readonly vehiclesService: VehiclesService,
    private readonly starshipsService: StarshipsService,
    private readonly speciesService: SpeciesService,
    private readonly planetsService: PlanetsService,
    private readonly peopleService: PeopleService,
    private readonly filmsService: FilmsService,
  ) { }

  async onModuleInit() {
    await this.sync();
  }

  private async syncGenericTables(service: GenericService, items: Result[]) {
    const createGenericEntity = (item: Result) =>
      new CreateGenericDto({
        id: +item.uid,
        name: item.name,
        url: item.url,
      });

    const existing_items = await service.findAll({});

    const non_existing_items = items.map(item => createGenericEntity(item)).filter(item => !existing_items.find(existing => existing.id === item.id));

    await service.createMany(
      non_existing_items
    );
  }

  private queryEndpoints = async () =>
    Promise.all([
      this.starWarsService.getPeople(),
      this.starWarsService.getPlanets(),
      this.starWarsService.getVehicles(),
      this.starWarsService.getStarships(),
      this.starWarsService.getSpecies(),
      this.starWarsService.getFilms(),
    ]);

  private queryTables = async () =>
    Promise.all([
      this.peopleService.findAll({}),
      this.planetsService.findAll({}),
      this.vehiclesService.findAll({}),
      this.starshipsService.findAll({}),
      this.speciesService.findAll({}),
      this.filmsService.findAll({}),
    ]);

  @Cron(CronExpression.EVERY_10_MINUTES)
  async sync() {
    console.log("Syncing external api data");

    let [
      people,
      planets,
      vehicles,
      starships,
      species,
      films
    ] = await this.queryEndpoints();

    // should implement sync based on last sync date

    await this.syncGenericTables(this.vehiclesService, vehicles);
    console.log("vehicles sync complete...");
    await this.syncGenericTables(this.starshipsService, starships);
    console.log("starships sync complete...");
    await this.syncGenericTables(this.speciesService, species);
    console.log("species sync complete...");
    await this.syncGenericTables(this.planetsService, planets);
    console.log("planets sync complete...");
    await this.syncGenericTables(this.peopleService, people);
    console.log("people sync complete...");

    const [
      updated_people,
      updated_planets,
      updated_vehicles,
      updated_starships,
      updated_species,
      updated_films
    ] = await this.queryTables();

    function processUrlArray(a: string[], b: GenericEntity[]){
      function findById(array: GenericEntity[], id: number) {
        const item = array.find(item => item.id === id);
        if (!item) {
          console.log(`Could not find item with id: ${id} skiping...`);
          return null;
        }
        return item.id;
      }

      const getIdFromUrl = (url: string) => +url.split('/').pop()!
      
      return a.map(item => findById(b, getIdFromUrl(item))).filter(item => item != null);  
    }

    const new_films: CreateFilmDto[] =
      films.filter(item => !updated_films.find(updated => updated.id === +item.uid))
        .map(film => ({
          id: +film.uid,
          producer: film.properties.producer,
          title: film.properties.title,
          episode_id: film.properties.episode_id,
          director: film.properties.director,
          release_date: film.properties.release_date,
          opening_crawl: film.properties.opening_crawl,
          description: film.description,
          film_people: processUrlArray(film.properties.characters, updated_people),
          film_species: processUrlArray(film.properties.species, updated_species),
          film_starships: processUrlArray(film.properties.starships, updated_starships),
          film_vehicles: processUrlArray(film.properties.vehicles, updated_vehicles),
          film_planets: processUrlArray(film.properties.planets, updated_planets),
        }));

    await this.filmsService.createMany(new_films);
    console.log("films sync complete...");

    console.log("Synced external api data");
  }
}
