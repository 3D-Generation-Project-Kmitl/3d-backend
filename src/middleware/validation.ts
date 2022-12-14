import { Validator } from 'class-validator';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
    RequestHandler, Request, Response, NextFunction,
} from 'express';
import { CustomValidationError } from '../utils/validationErrorFactory';

type Constructor<T> = { new(): T };

export function validateRequest<T extends object>(type: Constructor<T>): RequestHandler {
    const validator = new Validator();

    return (req: Request, res: Response, next: NextFunction) => {
        const input = plainToInstance(type, req.body);

        const validateErrors = validator.validateSync(input);

        if (validateErrors.length > 0) {
            next(CustomValidationError(validateErrors[0]));
        } else {
            req.body = input;
            next();
        }
    };
}
interface ValidateResult {
    target?: Record<string, unknown>;
    value: number;
    property: string;
    children: {
        constraints: { [type: string]: string };
    }[];
    constraints: { [type: string]: string };
}

const validateConstraints = (payload: any, property = '', resultArray: string[] = []) => {
    if (payload.children && payload.children.length > 0) {
        payload.children.forEach((child: any) => validateConstraints(child, payload.property, resultArray));
        return resultArray;
    }
    const errorArray = Object.values(payload.constraints).map(
        (errString) => `${property ? `${property}.` : ''}${errString}`,
    );
    resultArray.push(...errorArray);
    return resultArray;
};

export const customValidateSync = (payloadClass: any): string[] => {
    const validator = new Validator();
    try {
        const errors = validator.validateSync(payloadClass);
        let resultArray: any[] = [];
        const plainErrors = instanceToPlain(errors);
        plainErrors.forEach((each: ValidateResult) => {
            resultArray = resultArray.concat(validateConstraints(each));
        });
        return resultArray;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export default {
    validateRequest,
    customValidateSync,
};