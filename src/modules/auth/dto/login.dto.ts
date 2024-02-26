import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @ApiProperty({ description: 'Email del usuario' })
    @IsNotEmpty({message: "El email del usuario es requerido para el login"})
    @IsEmail()
    public email: string;

    @ApiProperty({ description: 'Contraseña del usuario' })
    @IsNotEmpty({message: "La contraseña del usuario es requerida para el login"})
    public password: string;
}