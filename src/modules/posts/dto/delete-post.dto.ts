import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DeletePostDto{
    @ApiProperty({ description: 'Codigo del post' })
    @IsNotEmpty({message: "El codigo del post es requerido"})
    public postCode: number;
}
