import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class LikePostDto{
    @ApiProperty({ description: 'Codigo del post' })
    @IsNumber()
    @IsNotEmpty({message: "El codigo del post es requerido"})
    public postCode: number;
}
