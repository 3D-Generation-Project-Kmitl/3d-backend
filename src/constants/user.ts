export enum RoleEnum {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export enum StatusEnum {
    REJECTED = 'REJECTED',
    PENDING = 'PENDING',
    APPROVED = 'APPROVED'
}

const isAdmin = (role: String) => role === RoleEnum.ADMIN;

const isPermitRole = (role: String, permitRole: String) => role === permitRole;

export {
    isAdmin,
    isPermitRole
};