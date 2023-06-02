const { ProductModel } = require("../../../models/products");
const { deleteFileInPublic, listOfImageFromRequest } = require("../../../utils/function");
const { createProductSchema } = require("../../../validator/admin/product.schema");
const Controller = require("../controller");
const path = require("path");

class ProductController extends Controller {
    async addProduct(req, res, next) {
        try {
            const productBody = await createProductSchema.validateAsync(req.body);
            const images = listOfImageFromRequest(req.files, req.body.fileUploadPath);
            const { title, text, short_text, tags, category, price, count, discount, width, weight, length, height } = productBody;
            const supplier = req.user._id;
            let feature = {};
            let type;
            if (isNaN(width) || isNaN(length) || isNaN(height) || isNaN(weight)) {
                type = 'physical';
                if (!width) feature.width = 0;
                else feature.width = width;
                if (!length) feature.length = 0;
                else feature.length = length;
                if (!height) feature.height = 0;
                else feature.height = height;
                if (!weight) feature.weight = 0;
                else feature.weight = weight;
            } else type = "virtual ";
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
            return res.status(201).json({
                statusCode: 201,
                message: "ثبت محصول با موفقیت ثبت شد"
            })
        } catch (error) {
            deleteFileInPublic(req.body.image);
            next(error);
        }
    }
    async removeProduct(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }
    async editProduct(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }
    async getAllProduct(req, res, next) {
        try {
            const products = await ProductModel.find({});
            return res.status(200).json({
                statusCode: 200,
                Products: products ? products : "محصولی یافت نشد"
            })
        } catch (error) {
            next(error);
        }
    }
    async getOneProduct(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }
}
module.exports = {
    ProductController: new ProductController()
}