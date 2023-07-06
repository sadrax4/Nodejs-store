const createHttpError = require("http-errors");
const { BlogModel } = require("../../../../models/blogs");
const { deleteFileInPublic } = require("../../../../utils/function");
const { createBlogSchema } = require("../../../../validator/admin/blog.schema");
const Controller = require("../../controller");
const path = require("path");
const { StatusCodes } = require("http-status-codes");
class BlogController extends Controller {
    async getListOfBlog(req, res, next) {
        try {
            const blogs = await BlogModel.aggregate([
                { $match: {} },
                {
                    $lookup: {
                        from: "users",
                        foreignField: "_id",
                        localField: "author",
                        as: "author"
                    }
                },
                { $unwind: "$author" },
                {
                    $project: {
                        "author.__v": 0,
                        "author.otp": 0,
                        "author.bills": 0,
                        "author.discount": 0,
                        "author.roles": 0
                    }
                }, {
                    $lookup: {
                        from: "categories",
                        foreignField: "_id",
                        localField: "category",
                        as: "category"
                    }
                }, {
                    $project: {
                        "category.__v": 0
                    }
                },
                { $unwind: "$category" },
            ])
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    blogs
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async addBlog(req, res, next) {
        try {
            const blogData = await createBlogSchema.validateAsync(req.body);
            req.body.image = path.join(blogData.fileUploadPath, blogData.filename)
            const { title, text, short_text, tags, category, image } = req.body;
            const author = req.user._id;
            await BlogModel.create({ title, text, short_text, tags, category, image, author });
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: "مقاله با موفقیت ایجاد شد"
                }
            });
        } catch (error) {
            deleteFileInPublic(req.body.image);
            next(error);
        }
    }
    async findBlogById(req, res, next) {
        try {
            const { id } = req.params;
            const blog = await this.findBlog(id);
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    blog
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async updateBlog(req, res, next) {
        try {
            const { id } = req.params;
            await this.findBlog(id);
            if (req?.body?.image) {
                req.body.image = path.join(blogData.fileUploadPath, blogData.filename)
            }
            const data = req.body;
            const blackList = ["bookmark", "dislike", "like", "comment"]
            const nullData = process.env.NULL_DATA;
            Object.keys(data).forEach(key => {
                if (blackList.includes(data[key])) delete data[key];
                if (typeof data[key] === 'string') data[key] = data[key].trim();
                if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim());
                if (nullData.includes(data[key])) delete data[key]
            })
            const updateResult = await BlogModel.updateOne({ _id: id }, { $set: data });
            if (updateResult.modifiedCount == 0) throw createHttpError("بلاگ به روز رسانی نشد");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "مقاله با موفقیت به روز رسانی شد"
                }
            });
        } catch (error) {
            deleteFileInPublic(req?.body?.image)
            next(error);
        }
    }
    async removeBlog(req, res, next) {
        try {
            const { id } = req.params;
            const blog = await this.findBlog(id);
            const deleteResult = await BlogModel.deleteOne({ _id: blog._id });
            if (deleteResult.deletedCount == 0) throw createHttpError.InternalServerError("بلاگ حذف نشد !");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "بلاگ با موفقیت حذف شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async findBlog(query) {
        const blog = await BlogModel.findOne({ _id: query }).populate([{ path: "category", select: { "children": 0 } }, { path: "author" }]);
        if (!blog) throw createHttpError.NotFound("بلاگی یافت نشد");
        return blog;
    }
}
module.exports = {
    BlogController: new BlogController()
}