import { IsDate, IsOptional } from "class-validator";

export class GeneralAuditoryDTO {

    @IsOptional()
    @IsDate()
    public createdAt: Date;

    @IsOptional()
    @IsDate()
    public updatedAt: Date;

    @IsOptional()
    @IsDate()
    public deletedAt: Date;
}
