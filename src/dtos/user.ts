import {
    IsNotEmpty, IsString, IsOptional, IsEnum, IsDate, Length, MinLength
} from 'class-validator';
import { RoleEnum } from '../constants/user';

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
    @Length(1, 100)
    name: String = '';

    @IsOptional()
    @IsEnum(RoleEnum, { each: true })
    role?: String = undefined;
}