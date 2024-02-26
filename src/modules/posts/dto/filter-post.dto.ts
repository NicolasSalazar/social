import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class FilterPostDto  {

    @ApiProperty({ description: 'Codigo del post' })
    @IsOptional()
    public postCode: number;

    @ApiProperty({ description: 'Codigo del usuario' })
    @IsOptional()
    public userCode : number;

    @ApiProperty({ description: 'Titulo del post' })
    @IsOptional()
    public title: string;

    @ApiProperty({ description: 'Contenido del post' })
    @IsOptional()
    public content: string;

    @ApiProperty({ description: 'Likes del post' })
    @IsOptional()
    public likes: number;

    @ApiProperty({ description: 'Pagina del post' })
    @IsNotEmpty({message: "El campo page requerido"})
    public page: number;

    @ApiProperty({ description: 'Cantidades de datos por pagina del post' })
    @IsNotEmpty({message: "El campo pageSize requerido"})
    public pageSize: number;
}
