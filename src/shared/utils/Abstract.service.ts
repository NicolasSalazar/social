import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export abstract class AbstractService<ModuleDTO> {

	constructor(
		private readonly prismaServiceImplements: PrismaService, 
		private readonly module: string 
	) {}

	public async create(object: object): Promise<ModuleDTO> {
		try {
			const createObject: ModuleDTO = await this.prismaServiceImplements[this.module].create({
				data: object
			});
			console.log("createObject", createObject)
			if (createObject != null) {
				return createObject;
			} else {
				throw new Error("No se ha podido registrar la información para el modulo: " + this.module);
			}
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	
	public async update(ids: object, object: object): Promise<ModuleDTO> {
		try {
			const updateObject: ModuleDTO = await this.prismaServiceImplements[this.module].update({
				data: object,
				where: ids
			})
			if (updateObject != null) {
				return updateObject;
			} else {
				throw new Error("No se ha podido actualizar la información para el modulo: " + this.module);
			}
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	
	public async getAllWithFiltersAndPagination(page: number, pageSize: number, where: object) {

		try {
			const count = await this.prismaServiceImplements[this.module].count({ where });
			const listObject = await this.prismaServiceImplements[this.module].findMany({
				take: pageSize,
				skip: (page - 1) * pageSize,
				where: {
					...where,
					deletedAt: null
				},
				orderBy: {
					createdAt: 'desc'
				}
			});
			return {
				listObject: listObject ? listObject : [],
				currentPage: page,
				count
			}


		} catch (error) {
			console.log(error)
			throw new BadRequestException(error.message);
		}

	}


	public async getByIds(ids: Object): Promise<ModuleDTO> {
		try {
			const object: ModuleDTO = await this.prismaServiceImplements[this.module].findFirst({
				where: ids
			});
			if (object != null) {
				return object;
			} else {
				return null;
			}

		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}
}
