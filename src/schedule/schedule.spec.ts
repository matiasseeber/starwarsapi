import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleService } from './schedule.service';
import { StarWarsService } from 'src/integrations/starwars/starwars.service';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { StarshipsService } from 'src/starships/starships.service';
import { SpeciesService } from 'src/species/species.service';
import { PlanetsService } from 'src/planets/planets.service';
import { PeopleService } from 'src/people/people.service';
import { FilmsService } from 'src/films/films.service';

describe('ScheduleService', () => {
    let service: ScheduleService;

    const mockStarWarsService = {
        getPeople: jest.fn(),
        getPlanets: jest.fn(),
        getVehicles: jest.fn(),
        getStarships: jest.fn(),
        getSpecies: jest.fn(),
        getFilms: jest.fn(),
    };

    const createMockGenericService = () => ({
        findAll: jest.fn().mockResolvedValue([]),
        createMany: jest.fn(),
    });

    const mockFilmsService = {
        ...createMockGenericService(),
    };

    const mockVehiclesService = createMockGenericService();
    const mockStarshipsService = createMockGenericService();
    const mockSpeciesService = createMockGenericService();
    const mockPlanetsService = createMockGenericService();
    const mockPeopleService = createMockGenericService();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ScheduleService,
                { provide: StarWarsService, useValue: mockStarWarsService },
                { provide: VehiclesService, useValue: mockVehiclesService },
                { provide: StarshipsService, useValue: mockStarshipsService },
                { provide: SpeciesService, useValue: mockSpeciesService },
                { provide: PlanetsService, useValue: mockPlanetsService },
                { provide: PeopleService, useValue: mockPeopleService },
                { provide: FilmsService, useValue: mockFilmsService },
            ],
        }).compile();

        service = module.get<ScheduleService>(ScheduleService);
    });

    afterEach(() => jest.clearAllMocks());

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('sync', () => {
        it('should fetch and sync new data correctly', async () => {
            const fakeItem = (uid: number) => ({
                uid: uid.toString(),
                name: `Item ${uid}`,
                url: `https://swapi.dev/api/item/${uid}/`,
            });

            const fakeFilm = {
                uid: "1",
                description: "A test film",
                properties: {
                    title: "Test Film",
                    episode_id: 1,
                    producer: "George Lucas",
                    director: "George Lucas",
                    release_date: "1977-05-25",
                    opening_crawl: "It is a period of civil war...",
                    characters: ["https://swapi.dev/api/people/1/"],
                    species: [],
                    starships: [],
                    vehicles: [],
                    planets: [],
                },
            };

            mockStarWarsService.getPeople.mockResolvedValue([fakeItem(1)]);
            mockStarWarsService.getPlanets.mockResolvedValue([]);
            mockStarWarsService.getVehicles.mockResolvedValue([]);
            mockStarWarsService.getStarships.mockResolvedValue([]);
            mockStarWarsService.getSpecies.mockResolvedValue([]);
            mockStarWarsService.getFilms.mockResolvedValue([fakeFilm]);

            mockPeopleService.findAll.mockResolvedValue([]);
            mockPlanetsService.findAll.mockResolvedValue([]);
            mockVehiclesService.findAll.mockResolvedValue([]);
            mockStarshipsService.findAll.mockResolvedValue([]);
            mockSpeciesService.findAll.mockResolvedValue([]);
            mockFilmsService.findAll.mockResolvedValue([]);

            await service.sync();

            expect(mockStarWarsService.getPeople).toHaveBeenCalled();
            expect(mockPeopleService.createMany).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({ id: 1, name: "Item 1" }),
                ])
            );

            expect(mockFilmsService.createMany).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        title: "Test Film",
                        episode_id: 1,
                    }),
                ])
            );
        });
    });

    it('should call queryEndpoints and queryTables and syncGenericTables correctly', async () => {
        const fakeGenericItem = (uid: number) => ({
            uid: uid.toString(),
            name: `Name ${uid}`,
            url: `https://swapi.dev/api/item/${uid}/`
        });

        const fakePeople = [fakeGenericItem(1)];
        const fakePlanets = [fakeGenericItem(2)];
        const fakeVehicles = [fakeGenericItem(3)];
        const fakeStarships = [fakeGenericItem(4)];
        const fakeSpecies = [fakeGenericItem(5)];
        const fakeFilms = [{
            uid: '10',
            description: 'A film',
            properties: {
                title: 'Test Film',
                episode_id: 1,
                producer: 'George',
                director: 'George',
                release_date: '2000-01-01',
                opening_crawl: 'crawl',
                characters: [],
                species: [],
                starships: [],
                vehicles: [],
                planets: [],
            }
        }];

        mockStarWarsService.getPeople.mockResolvedValue(fakePeople);
        mockStarWarsService.getPlanets.mockResolvedValue(fakePlanets);
        mockStarWarsService.getVehicles.mockResolvedValue(fakeVehicles);
        mockStarWarsService.getStarships.mockResolvedValue(fakeStarships);
        mockStarWarsService.getSpecies.mockResolvedValue(fakeSpecies);
        mockStarWarsService.getFilms.mockResolvedValue(fakeFilms);

        mockVehiclesService.findAll.mockResolvedValue([]);
        mockStarshipsService.findAll.mockResolvedValue([]);
        mockSpeciesService.findAll.mockResolvedValue([]);
        mockPlanetsService.findAll.mockResolvedValue([]);
        mockPeopleService.findAll.mockResolvedValue([]);
        mockFilmsService.findAll.mockResolvedValue([]);

        const syncGenericTablesSpy = jest.spyOn<any, any>(service, 'syncGenericTables');

        await service.sync();

        expect(mockStarWarsService.getPeople).toHaveBeenCalled();
        expect(mockStarWarsService.getPlanets).toHaveBeenCalled();
        expect(mockStarWarsService.getVehicles).toHaveBeenCalled();
        expect(mockStarWarsService.getStarships).toHaveBeenCalled();
        expect(mockStarWarsService.getSpecies).toHaveBeenCalled();
        expect(mockStarWarsService.getFilms).toHaveBeenCalled();

        expect(syncGenericTablesSpy).toHaveBeenCalledWith(mockVehiclesService, fakeVehicles);
        expect(syncGenericTablesSpy).toHaveBeenCalledWith(mockStarshipsService, fakeStarships);
        expect(syncGenericTablesSpy).toHaveBeenCalledWith(mockSpeciesService, fakeSpecies);
        expect(syncGenericTablesSpy).toHaveBeenCalledWith(mockPlanetsService, fakePlanets);
        expect(syncGenericTablesSpy).toHaveBeenCalledWith(mockPeopleService, fakePeople);

        expect(mockPeopleService.findAll).toHaveBeenCalled();
        expect(mockPlanetsService.findAll).toHaveBeenCalled();
        expect(mockVehiclesService.findAll).toHaveBeenCalled();
        expect(mockStarshipsService.findAll).toHaveBeenCalled();
        expect(mockSpeciesService.findAll).toHaveBeenCalled();
        expect(mockFilmsService.findAll).toHaveBeenCalled();

        expect(mockFilmsService.createMany).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({ title: 'Test Film' }),
            ])
        );
    });
});
