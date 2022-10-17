import { Transform, Type } from 'class-transformer';
import {
    IsNotEmpty, IsString, IsNumber, MaxLength, Length
} from 'class-validator';

export class CreateIdentityRequestDTO {
    @IsNumber()
    @IsNotEmpty()
    userId: number = -1;

    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    firstName: string = '';

    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    lastName: string = '';

    @IsString()
    @IsNotEmpty()
    @Length(10, 10)
    phone: string = '';

    @IsString()
    @IsNotEmpty()
    @Length(13, 13)
    idCardNumber: string = '';

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    cardPicture: string = '';

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    cardFacePicture: string = '';

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    status: string = '';
}

export class UpdateIdentityRequestDTO {
    @IsNumber()
    @IsNotEmpty()
    userId: number = -1;

    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    firstName: string = '';

    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    lastName: string = '';

    @IsString()
    @IsNotEmpty()
    @Length(10, 10)
    phone: string = '';

    @IsString()
    @IsNotEmpty()
    @Length(13, 13)
    idCardNumber: string = '';

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    cardPicture: string = '';

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    cardFacePicture: string = '';

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    status: string = '';
}