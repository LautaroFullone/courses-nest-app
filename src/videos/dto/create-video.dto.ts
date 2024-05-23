import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID, IsUrl, Length } from "class-validator";

export class CreateVideoDto {
    
    @IsNotEmpty()
    @Length(1,15)
    title: string;
    
    @IsNotEmpty()
    @Length(1, 15)
    description: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    idCourse;
    
    // @IsUrl()
    // src: string;
}
