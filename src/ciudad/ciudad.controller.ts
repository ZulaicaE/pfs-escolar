import { Controller, Get, Post } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { Ciudad } from './entities/ciudad.entity';

@Controller('ciudad')
export class CiudadController {
    constructor(private readonly ciudadServices: CiudadService) {}
    @Get('getAll')
    async getAll(): Promise<Ciudad[]> {
        return this.ciudadServices.getAll();
    }

    @Get('getById')
    async getById(): Promise<Ciudad> {
        return this.ciudadServices.getById(3);
    }
}