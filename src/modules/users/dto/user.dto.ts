import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { GeneralAuditoryDTO } from "src/shared/utils/GeneralAuditoryDTO";

export class UserDto extends GeneralAuditoryDTO {

    @ApiProperty({ description: 'Codigo del usuario' })
    @IsNumber()
    @IsNotEmpty({message: "El codigo de usuario es requerido"})
    public userCode: number;

    @ApiProperty({ description: 'Nombre del usuario' })
    @IsString()
    @IsNotEmpty({message: "El Nombre del usuario es requerido"})
    public fullName: string;

    @ApiProperty({ description: 'Edad del usuario' })
    @IsNotEmpty({message: "La edad del usuario es requerida"})
    @IsNumber()
    public age: number;

    @ApiProperty({ description: 'Email del usuario' })
    @IsNotEmpty({message: "El email del usuario es requerido"})
    @IsString()
    public email: string;

    @ApiProperty({ description: 'Contraseña del usuario' })
    @IsNotEmpty({message: "La constraña del usuario es requerida"})
    @IsString()
    public password: string;
}
