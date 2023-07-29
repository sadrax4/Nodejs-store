const createHttpError = require("http-errors");
const { PermissionsModel } = require("../models/permissions");
const { RoleModel } = require("../models/role");
const { PERMISSIONS } = require("../utils/constans");

function checkPermission(requiredPermission = []) {
    try {
        return async function (req, res, next) {
            const allPermissions = requiredPermission.flat(2);
            const user = req.user;
            const role = await RoleModel.findOne({ title: user.role });
            const permissions = await PermissionsModel.find({ _id: { $in: role.permissions } });
            const userPermissions = permissions.map(item => item.name) || [];
            if (userPermissions.includes((PERMISSIONS.ALL).toString())) return next();
            const hasPermission = allPermissions.every(permission => {
                return userPermissions.includes(permission);
            })
            if (hasPermission || allPermissions.length == 0) return next();
            throw createHttpError.Forbidden("سطح کاربری شما مجاز نمیباشد");
        }
    } catch (error) {
        next(error);
    }
}
module.exports = {
    checkPermission
}