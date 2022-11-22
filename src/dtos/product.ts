import {
    IsNotEmpty, IsString, IsNumber, MaxLength, Length, IsEnum, IsOptional
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
    @IsNumber()
    @IsOptional()
    categoryId: number;

    @IsString()
    @MaxLength(50)
    @IsOptional()
    name: string = '';

    @IsString()
    @MaxLength(500)
    @IsOptional()
    details?: string = '';

    @IsNumber()
    @IsOptional()
    price: number;

    @IsNumber()
    @IsOptional()
    modelId?: number;
}