import { ValidationError } from 'class-validator';
import { ApplicationError } from '../errors/applicationError';

function mapValidationError(error: any) {
    return {
        type: ApplicationError.errorType.APP_SERVICE,
        code: 'VALIDATION_ERROR',
        message: Object.values(error.constraints)[0],
        statusCode: 400,
        meta: {
            context: error.value,
        },
    };
}

export function CustomValidationError(error: any, overrides = {}) {
    const isValidationError = error instanceof ValidationError;
    if (isValidationError) {
        const validationError = mapValidationError(error);
        return new ApplicationError(validationError, overrides);
    }
    return new ApplicationError(error, overrides);
}