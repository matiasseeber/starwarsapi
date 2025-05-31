import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StarWarsService } from './starwars.service';

@Module({
    providers: [StarWarsService],
    exports: [StarWarsService],
    imports: [HttpModule]
})
export class StarWarsModule { }
