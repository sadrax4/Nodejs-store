const createHttpError = require("http-errors");
const { PermissionsModel } = require("../../../../models/permissions");
const { RoleModel } = require("../../../../models/role");
const Controller = require("../../controller");
const { addPermissionsSchema } = require("../../../../validator/admin/RBAC.schema");
const { StatusCodes } = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const { copyObject, deleteInvalidValue } = require("../../../../utils/function");

class PermissionsController extends Controller {
    async getPermissions(req, res, next) {
        try {
            const permissions = await PermissionsModel.find({});
            if (permissions.length == 0) throw createHttpError.NotFound("سطح دسترسی ای یافت نشد");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    permissions
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async addPermission(req, res, next) {
        try {
            const { name, description } = await addPermissionsSchema.validateAsync(req.body);
            await this.isPermissionExists(name);
            const createPermissionResult = await PermissionsModel.create({ name, description });
            if (!createPermissionResult) throw createHttpError.InternalServerError("سطح دسترسی ایجاد نشد!");
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: "سطح دسترسی با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async removePermission(req, res, next) {
        try {
            const permission = await this.findPermissionsById(req.params.id);
            console.log(permission)
            const deleteResult = await PermissionsModel.deleteOne({ _id: permission._id });
            if (deleteResult.deletedCount == 0) throw createHttpError.InternalServerError("سطح دسترسی حذف نشد");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "سطح دسترسی با موفقیت حذف شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async updatePermission(req, res, next) {
        try {
            const permission = await this.findPermissionsById(req.params.id);
            const data = copyObject(req.body);
            deleteInvalidValue(data, []);
            const updateResult = await PermissionsModel.updateOne({ _id: permission._id }, { $set: data });
            if (updateResult.modifiedCount == 0) {
                throw createHttpError.InternalServerError("سطح دسترسی   به روز رسانی نشد")
            }
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "سطح دسترسی با موفقیت به روز رسانی  شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async isPermissionExists(name) {
        const permission = await PermissionsModel.find({ name });
        if (permission.length >= 1) throw createHttpError.NotFound("سطح دسترسی قبلا ثبت شده است");
        return;
    }
    async findPermissionsById(_id) {
        if (!mongoose.isValidObjectId(_id)) throw createHttpError.BadRequest("ایدی وارد شده صحیح نمیباشد");
        const permission = await PermissionsModel.findOne({ _id });
        if (!permission) throw createHttpError.NotFound("سطح دسترسی ای یافت نشد");
        return permission;
    }
}
module.exports = {
    PermissionsController: new PermissionsController()
}