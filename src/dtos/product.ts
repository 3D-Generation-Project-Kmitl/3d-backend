import {
    IsNotEmpty, IsString, IsNumber, MaxLength, Length, IsEnum
} from 'class-validator';


export class CreateProductRequestDTO {
    @IsNotEmpty()
    @IsNumber()
    categoryId: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;

    @IsString()
    @MaxLength(500)
    details?: string = '';

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    modelId: number;
}

export class UpdateProductRequestDTO {
    @IsNotEmpty()
    @IsNumber()
    categoryId: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string = '';

    @IsString()
    @MaxLength(500)
    details?: string = '';

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    modelId: number;
}