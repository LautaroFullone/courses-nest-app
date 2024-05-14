import { IsNotEmpty, IsUrl, Length } from "class-validator";

export class CreateVideoDto {
    
    @IsNotEmpty()
    @Length(1,15)
    title: string;
    
    @IsNotEmpty()
    @Length(1, 15)
    description: string;
    
    @IsUrl()
    src: string;
}
