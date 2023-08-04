const { StatusCodes } = require("http-status-codes");
const Controller = require("../controller");
const createHttpError = require("http-errors");
const { addNamespaceValidator } = require("../../../validator/support/support.schema");
const { ConversaionModel } = require("../../../models/conversion");

class NamespaceController extends Controller {
    async addNamespace(req, res, next) {
        try {
            const namespaceData = await addNamespaceValidator.validateAsync(req.body);
            await this.checkExistConversion(namespaceData.endPoint);
            const createNamespaceResult = await ConversaionModel.create(namespaceData);
            if (!createNamespaceResult) {
                throw createHttpError.InternalServerError("خطای داخلی . محیط چت ایجاد نشد")
            }
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: "محیط چت با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async getNamespace(req, res, next) {
        try {
            const namespaces = await ConversaionModel.find({});
            if (namespaces.length == 0) {
                throw createHttpError.NotFound("محیط چتی یافت نشد ")
            }
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    namespaces
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async checkExistConversion(endpoint) {
        const conversion = await ConversaionModel.findOne({ endpoint })
        if (conversion) {
            throw createHttpError.NotFound("محیط چت قبلا ایجاد شده است")
        }
        return;
    }
}
module.exports = {
    NamespaceController: new NamespaceController()
}