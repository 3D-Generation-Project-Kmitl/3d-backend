import {
    IsNotEmpty, IsString, IsNumber, MaxLength, Length, IsEnum
} from 'class-validator';
import { StatusEnum } from '../constants/user';

export class CreateIdentityRequestDTO {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @Length(10, 10)
    phone: string;

    @IsString()
    @IsNotEmpty()
    @Length(13, 13)
    idCardNumber: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    cardPicture: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    cardFacePicture: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    status: string;
}

export class UpdateIdentityRequestDTO {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @Length(10, 10)
    phone: string;

    @IsString()
    @IsNotEmpty()
    @Length(13, 13)
    idCardNumber: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    cardPicture: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    cardFacePicture: string;
}

export class AdminUpdateIdentityRequestDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @IsEnum(StatusEnum, { each: true })
    status: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    issue: string;
}