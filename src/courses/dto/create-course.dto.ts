import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID, IsUrl } from "class-validator";

export class CreateCourseDto {

    @ApiProperty()
    @IsNotEmpty()
    title: string

    @ApiProperty()
    @IsNotEmpty()
    price: number
    
    @ApiProperty()
    @IsNotEmpty()
    description: string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsUrl()
    cover: string

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    idAuthor: string
}
