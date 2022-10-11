export enum RoleEnum {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

const isAdmin = (role: String) => role === RoleEnum.ADMIN;

const isPermitRole = (role: String, permitRole: String) => role === permitRole;

export {
    isAdmin,
    isPermitRole
};