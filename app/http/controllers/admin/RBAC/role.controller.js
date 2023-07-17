const createHttpError = require("http-errors");
const { RoleModel } = require("../../../../models/role");
const { addRoleSchema, updateRoleSchema } = require("../../../../validator/admin/RBAC.schema");
const Controller = require("../../controller");
const { StatusCodes } = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const { copyObject, deleteInvalidValue } = require("../../../../utils/function");

class RoleController extends Controller {
    async addRole(req, res, next) {
        try {
            const { title, permissions, description } = await addRoleSchema.validateAsync(req.body);
            await this.isTitleExists(title);
            const role = await RoleModel.create({ title, description, permissions });
            if (!role) throw createHttpError.InternalServerError("نقشی ایجاد نشد");
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: "نقش با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async getRoles(req, res, next) {
        try {
            const roles = await RoleModel.find({});
            if (!roles) throw createHttpError.NotFound("نقشی یافت نشد");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    roles
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async removeRole(req, res, next) {
        try {
            const { field } = req.params;
            const role = await this.findRoleByIdOrTitle(field);
            const removeResult = await RoleModel.deleteOne({ _id: role._id });
            if (removeResult.deletedCount == 0) throw createHttpError.InternalServerError("نقش  حذف نشد")
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "نقش با موفقیت حذف شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async updateRole(req, res, next) {
        try {
            const role = await this.findRoleByIdOrTitle(req.params.id);
            const data = copyObject(req.body);
            deleteInvalidValue(data, []);
            const updateResult = await RoleModel.updateOne({ _id: role._id }, { $set: data });
            if (updateResult.modifiedCount == 0) {
                throw createHttpError.InternalServerError("نقش   به روز رسانی نشد")
            }
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "نقش با موفقیت به روز رسانی  شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async isTitleExists(title) {
        const checkExists = await RoleModel.find({ title });
        if (checkExists.length >= 1) throw createHttpError.InternalServerError("این نقش قبلا ثبت شده است");
        return;
    }
    async findRoleByIdOrTitle(field) {
        const findQuery = mongoose.isValidObjectId(field) ? { _id: field } : { title: field };
        const role = await RoleModel.findOne(findQuery);
        if (!role) throw createHttpError.NotFound("نقشی یافت نشد");
        return role;
    }
}
module.exports = {
    RoleController: new RoleController()
}