import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { GeneralAuditoryDTO } from "src/shared/utils/GeneralAuditoryDTO";

export class CreatePostDto extends GeneralAuditoryDTO {

    @ApiProperty({ description: 'Codigo del post' })
    @IsNumber()
    @IsNotEmpty({message: "El codigo de post es requerido"})
    public postCode: number;

    @ApiProperty({ description: 'El codigo  del usuario' })
    @IsNumber()
    @IsNotEmpty({message: "El codigo de usuario es requerido"})
    public userCode: number;

    @ApiProperty({ description: 'El titulo del post' })
    @IsString()
    @IsNotEmpty({message: "El titulo del post es requerido"})
    public title: string;

    @ApiProperty({ description: 'El contenido del post' })
    @IsNotEmpty({message: "El contenido del post es requerido"})
    @IsString()
    public content: string;

    @ApiProperty({ description: 'Los likes del post' })
    @IsNotEmpty({message: "Los likes son requeridos"})
    @IsNumber()
    public likes: number;
}
