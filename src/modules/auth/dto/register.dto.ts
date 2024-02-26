import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty} from "class-validator";
export class RegisterDto {

    @ApiProperty({ description: 'Nombre completo del usuario' })
    @IsNotEmpty({message: "El nombre del usuario es requerido"})
    public fullName: string;

    @ApiProperty({ description: 'Edad del usuario' })
    @IsNotEmpty({message: "El edad del usuario es requerido"})
    public age: number;

    @ApiProperty({ description: 'Email del usuario' })
    @IsNotEmpty({message: "El email del usuario es requerido"})
    @IsEmail()
    public email: string;

    @ApiProperty({ description: 'Contraseña del usuario' })
    @IsNotEmpty({message: "La contraseña del usuario es requerida"})
    public password: string;
}
