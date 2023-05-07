const createHttpError = require("http-errors");
const { CategoryModel } = require("../../../models/categories");
const Controller = require("../controller");
const { addCategorySchema } = require("../../../validator/admin/caregory.schema");
const { $_match } = require("@hapi/joi/lib/base");

class CategoryController extends Controller {
    async addCategory(req, res, next) {
        try {
            await addCategorySchema.validateAsync(req.body);
            const { title, parent } = req.body;
            const category = await CategoryModel.create({ title, parent });
            if (!category) throw createHttpError.InternalServerError("دسته بندی ایجاد نشد")
            return res.status(201).send("دسته بندی با موفقیت اضافه شد");
        } catch (error) {
            next(error);
        }
    }
    async editCategory(req, res, next) {
        try {

        } catch (error) {

        }
    }
    async removeCategory(req, res, next) {
        try {
            const { id } = req.params;
            const category = await this.checkExistsCategory(id);
            const deleteCategory = await CategoryModel.deleteOne({ _id: category._id });
            if (deleteCategory == 0) throw createHttpError.InternalServerError("دسته بندی حذف نشد!");
            return res.status(200).json({
                status: 200,
                message: "دسته بندی با موفقیت حذف شد"
            })
        } catch (error) {
            next(error);
        }
    }
    async getAllCategory(req, res, next) {
        try {
            // const category = await CategoryModel.aggregate([
            //     {
            //         $lookup: {
            //             from: "categories",
            //             localField: "_id",
            //             foreignField: "parent",
            //             as: "children"
            //         }
            //     }, {
            //         $project: {
            //             __v: 0,
            //             "children.__v": 0,
            //             "children.parent": 0
            //         }
            //     }
            // ])
            const category = await CategoryModel.aggregate([
                {
                    $graphLookup: {
                        from: "categories",
                        startWith: "$_id",
                        connectFromField:"_id",
                        connectToField: "parent",
                        maxDepth:5,
                        depthField:"depth",
                        as: "children"
                    }
                }, {
                    $project: {
                        __v: 0,
                        "children.__v": 0,
                        "children.parent": 0
                    }
                },{
                    $match:{
                        //"parent": undefined
                    }
                }
            ])
            return res.status(200).json({
                data: category
            })
        } catch (error) {
            next(error);
        }
    }
    async getCategoryById(req, res, next) {
        try {

        } catch (error) {

        }
    }
    async getParents(req, res, next) {
        try {
            const parents = await CategoryModel.find({ parent: undefined });
            return res.status(200).json({
                data: parents
            })
        } catch (error) {
            next(error);
        }
    }
    async getChildOfParent(req, res, next) {
        try {
            const { parent } = req.params;
            const children = await CategoryModel.find({ parent }, { _id: 0, __v: 0 });
            return res.status(200).json({
                data: children
            })
        } catch (error) {
            next(error);
        }
    }
    async checkExistsCategory(id) {
        const category = await CategoryModel.findById(id);
        if (!category) throw createHttpError.NotFound("دسته بندی مورد نطر یافت نشد");
        return category;
    }
}
module.exports = {
    CategoryController: new CategoryController()
}