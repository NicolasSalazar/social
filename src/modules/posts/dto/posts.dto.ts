import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { GeneralAuditoryDTO } from "src/shared/utils/GeneralAuditoryDTO";

export class PostDto extends GeneralAuditoryDTO {

    @ApiProperty({ description: 'Codigo del post' })
    @IsNumber()
    @IsNotEmpty({message: "El codigo de post es requerido"})
    public postCode: number;

    @ApiProperty({ description: 'Codigo del usuario' })
    @IsNumber()
    @IsNotEmpty({message: "El codigo de usuario es requerido"})
    public userCode: number;

    @ApiProperty({ description: 'Titulo del post' })
    @IsString()
    @IsNotEmpty({message: "El titulo del post es requerido"})
    public title: string;

    @ApiProperty({ description: 'Contenido del post' })
    @IsNotEmpty({message: "El contenido del post es requerido"})
    @IsString()
    public content: string;

    @ApiProperty({ description: 'Likes del post' })
    @IsNotEmpty({message: "Los likes son requeridos"})
    @IsNumber()
    public likes: number;
}
