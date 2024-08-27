import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';

@Injectable()
export class CiudadService {
    private ciudades: Ciudad[] = [];

    constructor(
        @InjectRepository(Ciudad)
        private readonly ciudadRepository: Repository<Ciudad>,
    ) { }

    public async getAll(): Promise<Ciudad[]> {
        const ciudades: Ciudad[] = await this.ciudadRepository.find();
        return ciudades;
    }

    public async getById(id: number): Promise<Ciudad> {
        try {
            const criterio: FindOneOptions = { where: { idCiudad: id } };
            const ciudad: Ciudad = await this.ciudadRepository.findOne(criterio)
            if (ciudad) return ciudad;
            throw new DOMException('La ciudad no se encuentra');
        } catch (e) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la busqueda de la ciudad ' + id + ': ' + e
            }, HttpStatus.NOT_FOUND)
        }
    }
}