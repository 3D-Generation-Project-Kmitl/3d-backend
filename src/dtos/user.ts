import {
    IsNotEmpty, IsString, IsOptional, IsEnum, IsDate, Length, MinLength
} from 'class-validator';
import { RoleEnum } from '../constants/user';

// "userId": 1,
//             "email": "pure@gmail.com",
//             "name": "pure",
//             "password": "$2a$10$XPtakPihgUrvjhXYtvJW3.UtV4ysyjRJ764eGSezVd3kswQOSAKO.",
//             "gAuthCode": null,
//             "picture": null,
//             "gender": null,
//             "dateOfBirth": null,
//             "isVerified": false,
//             "role": "USER",
//             "createdAt": "2022-10-17T10:53:07.938Z",
//             "updatedAt": "2022-10-17T11:55:15.389Z"

export class RegisterRequestDTO {
    @IsString()
    @IsNotEmpty()
    email: String = '';

    @IsOptional()
    @IsNotEmpty()
    @Length(8, 100)
    password: String = '';

    @IsOptional()
    @IsNotEmpty()
    @Length(1, 50)
    name: String = '';

    @IsOptional()
    @IsString()
    gAuthCode?: String = undefined;

    @IsOptional()
    @IsEnum(RoleEnum, { each: true })
    role?: String = undefined;
}

export class LoginRequestDTO {
    @IsString()
    @IsNotEmpty()
    email: String = '';

    @IsOptional()
    @IsNotEmpty()
    @Length(8, 100)
    password: String = '';
}

export class UpdatePasswordRequestDTO {
    @IsString()
    @IsNotEmpty()
    oldPassword: String = '';

    @IsString()
    @Length(8, 100)
    @IsNotEmpty()
    newPassword: String = '';
}

export class UpdateUserRequestDTO {
    @IsOptional()
    @Length(1, 50)
    name: String = '';

    @IsOptional()
    @IsEnum(RoleEnum, { each: true })
    role?: String = undefined;

    @IsOptional()
    @IsString()
    picture?: String = undefined;

    @IsOptional()
    @IsString()
    gender?: String = undefined;

    @IsOptional()
    @IsDate()
    dateOfBirth?: Date = undefined;
}