const createHttpError = require("http-errors");
const { ProductModel } = require("../../../../models/products");
const { deleteFileInPublic, listOfImageFromRequest, setFeature, copyObject, deleteInvalidValue } = require("../../../../utils/function");
const { createProductSchema } = require("../../../../validator/admin/product.schema");
const { objectIdValidator } = require("../../../../validator/public.validator");
const Controller = require("../../controller");
const path = require("path");
const { StatusCodes } = require("http-status-codes");
const { object } = require("@hapi/joi");
const productBlackList = {
    BOOKMARKS: "bookmarks",
    DISLIKE: "dislike",
    LIKE: "like",
    COMMENTS: "comments",
    SUPPLIER: "supplier",
    WIDTH: "width",
    HEIGHT: "height",
    LENGTH: "length",
    WEIGHT: "weight"
}
Object.freeze(productBlackList);
class ProductController extends Controller {
    async addProduct(req, res, next) {
        try {
            const productBody = await createProductSchema.validateAsync(req.body);
            const images = listOfImageFromRequest(req.files, req.body.fileUploadPath);
            const { title, text, short_text, tags, category, price, count, discount } = productBody;
            const supplier = req.user._id;
            let feature = setFeature(req.body);
            let type;
            if (feature) {
                type = "physical"
            } else {
                type = "virtual"
            }
            await ProductModel.create({
                title,
                text,
                type,
                short_text,
                tags,
                category,
                images,
                price,
                count,
                discount,
                feature,
                supplier
            });
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: "ثبت محصول با موفقیت ثبت شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(req.body.image);
            next(error);
        }
    }
    async removeProductById(req, res, next) {
        try {
            const { id } = req.params;
            await this.findProductById(id);
            const deleteProduct = await ProductModel.deleteOne({ _id: id });
            if (deleteProduct.deletedCount == 0) throw createHttpError.InternalServerError();
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "محصول با موفقیت حذف شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async updateProduct(req, res, next) {
        try {
            const { id } = req.params;
            await this.findProductById(id);
            const data = copyObject(req.body);
            data.images = listOfImageFromRequest(req.files, req.body.fileUploadPath);
            data.feature = setFeature(req.body);
            if (data.feature) {
                data.type = "physical"
            } else {
                data.type = "virtual"
            }
            const blackListField = Object.values(productBlackList);
            deleteInvalidValue(data, blackListField);
            const updateResult = await ProductModel.updateOne({ _id: id }, { $set: data });
            if (updateResult.modifiedCount == 0) throw { statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: "خطای داخلی" };
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "به روز رسانی با موفقیت ثبت شد"
                }
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    async searchProduct(req, res, next) {
        try {
            const search = req?.query?.search || "";
            const product = await ProductModel.find({
                $text: {
                    $search: search
                }
            })
            if (!product) throw createHttpError.NotFound("محصولی یافت نشد");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    product
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async newGetAllProducts(req, res, next) {
        try {
            const products = await ProductModel.aggregate([
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        foreignField: "_id",
                        localField: "supplier",
                        as: "supplier"
                    }
                },
                {
                    $project: {
                        '__v': 0,
                        'category.__v': 0,
                        'category._id': 0,
                        'supplier.__v': 0,
                        'supplier.roles': 0,
                        'supplier.otp': 0,
                        'supplier.bills': 0,
                        'supplier.discount': 0,
                    }
                }
            ]);
            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: {
                    Products: products ? products : "محصولی یافت نشد"
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async getAllProduct(req, res, next) {
        try {
            const products = await ProductModel.find({});
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    Products: products ? products : "محصولی یافت نشد"
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async getOneProduct(req, res, next) {
        try {
            const { id } = req.params;
            const product = await this.findProductById(id);
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    product
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async findProductById(productId) {
        const { id } = await objectIdValidator.validateAsync({ id: productId });
        console.log(id);
        const product = await ProductModel.findById(id);
        if (!product) throw createHttpError.NotFound("محصولی یافت نشد !");
        return product;
    }
}
module.exports = {
    ProductController: new ProductController()
}