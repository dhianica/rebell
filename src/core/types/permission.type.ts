import { Roles, Permissions } from '../enum'
export interface Auth {
    [Roles.SUPERADMINISTRATOR]: Permissions.READ | Permissions.WRITE | Permissions.EDIT | Permissions.DELETE | Permissions.EXECUTE;
    [Roles.ADMINISTRATOR]: Permissions.READ | Permissions.WRITE | Permissions.EDIT | Permissions.DELETE;
    [Roles.USER]: Permissions.READ | Permissions.WRITE | Permissions.EDIT;
    [Roles.GUEST]: Permissions.READ;
}
