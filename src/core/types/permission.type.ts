import { ERoles, EPermissions } from '../enum'
export interface Auth {
    [ERoles.SUPERADMINISTRATOR]: EPermissions.READ | EPermissions.WRITE | EPermissions.EDIT | EPermissions.DELETE | EPermissions.EXECUTE;
    [ERoles.ADMINISTRATOR]: EPermissions.READ | EPermissions.WRITE | EPermissions.EDIT | EPermissions.DELETE;
    [ERoles.USER]: EPermissions.READ | EPermissions.WRITE | EPermissions.EDIT;
    [ERoles.GUEST]: EPermissions.READ;
}
