import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatePostDto{
    @ApiProperty({ description: 'Codigo del usuario' })
    @IsNumber()
    @IsOptional()
    public userCode: number;

    @ApiProperty({ description: 'Codigo del post' })
    @IsNumber()
    @IsNotEmpty({message: "El codigo del post es requerido"})
    public postCode: number;

    @ApiProperty({ description: 'Titulo del post' })
    @IsOptional()
    @IsString()
    public title: string;

    @ApiProperty({ description: 'Contenido del post' })
    @IsOptional()
    @IsString()
    public content: string;

    @ApiProperty({ description: 'Fecha de actualizacion del post' })
    @IsOptional()
    @IsDate()
    public updatedAt: Date;
}
