import {
    IsNotEmpty, IsString, IsNumber, MaxLength, Length, IsEnum
} from 'class-validator';

export class CreateProductRequestDTO {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

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
    @IsString()
    @Length(1, 100)
    picture: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    model: string;
}

export class UpdateProductRequestDTO {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

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
    @IsString()
    @Length(1, 100)
    picture: string = '';

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    model: string = '';
}