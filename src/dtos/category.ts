import {
    IsNotEmpty, IsString, IsNumber, MaxLength, Length, IsEnum
} from 'class-validator';

export class CreateCategoryRequestDTO {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;
}

export class UpdateCategoryRequestDTO {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;
}
