import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsNumber, IsDate, IsOptional } from "class-validator";

export class UpdateUserDto{

    @ApiProperty({ description: 'Nombre del usuario' })
    @IsOptional()
    @IsString()
    public fullName?: string;

    @ApiProperty({ description: 'Edad del usuario' })
    @IsOptional()
    @IsNumber()
    public age?: number;

    @ApiProperty({ description: 'Email del usuario' })
    @IsOptional()
    @IsEmail()
    public email?: string;

    @ApiProperty({ description: 'Contraseña del usuario' })
    @IsOptional()
    @IsString()
    public password?: string;

    @ApiProperty({ description: 'Fecha de actualizacion del usuario' })
    @IsOptional()
    @IsDate()
    public updatedAt?: Date;
}
