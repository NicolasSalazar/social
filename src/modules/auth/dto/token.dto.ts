import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class TokenDto {
    @ApiProperty({ description: 'Token del usuario' })
    @IsNotEmpty({message: "El Token es requerido"})
    public token: string;
}