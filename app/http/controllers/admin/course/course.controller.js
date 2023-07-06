const { StatusCodes } = require("http-status-codes");
const { CoursesModel } = require("../../../../models/course");
const Controller = require("../../controller");
const createHttpError = require("http-errors");
const path = require("path");
const { deleteFileInPublic, copyObject, deleteInvalidValue, getTimeOfChapter } = require("../../../../utils/function");
const { createCourseSchema, addChapterSchema } = require("../../../../validator/admin/course.schema");
const { objectIdValidator } = require("../../../../validator/public.validator");
const CourseBlackList = {
    COMMENTS: "comments",
    LIKES: "likes",
    DISLIKES: "dislikes",
    BOOKMARKS: "bookmarks",
    TIMES: "times",
    STUDENTS: "students",
    EPISODES: "episodes",
    CHAPTERS: "chapters",
    FILEUPLOADPATH: "fileUploadPath",
    FILENAME: "filename"
}
Object.freeze(CourseBlackList);
class CourseController extends Controller {
    async getAllCourse(req, res, next) {
        try {
            const courses = await CoursesModel.aggregate([
                {
                    $lookup: {
                        from: "categories",
                        foreignField: "_id",
                        localField: "category",
                        as: "category"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        foreignField: "_id",
                        localField: "teacher",
                        as: "teacher"
                    }
                },
                {
                    $project: {
                        'teacher.roles': 0,
                        'teacher.otp': 0,
                        'teacher.bills': 0,
                        'teacher.discount': 0,
                        "teacher.__v": 0,
                        "category._id": 0,
                        "category.__v": 0,
                        "__v": 0
                    }
                }
            ])
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    courses
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async searchCourse(req, res, next) {
        try {
            const search = req.query;
            const courses = await CoursesModel.find({ $text: { $search: search } });
            if (!courses) throw createHttpError.NotFound("دوره ای یافت نشد");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    courses
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async addCourse(req, res, next) {
        try {
            await createCourseSchema.validateAsync(req.body);
            const { text, title, short_text, tags, category, price, discount, type } = req.body;
            if (Number(price) > 0 && type == "free") {
                throw createHttpError.BadRequest("برای دوره رایگان نمیتوان قیمت ثبت کرد")
            }
            if (Number(discount) > 0 && type == "free") {
                throw createHttpError.BadRequest("برای دوره رایگان نمیتوان تخفیف درج کرد")
            }
            const image = path.join(req.body.fileUploadPath, req.body.filename);
            const teacher = req.user._id;
            const status = "notStarted";
            const course = await CoursesModel.create({
                text,
                title,
                short_text,
                tags,
                category,
                price,
                discount,
                type,
                image,
                status,
                teacher
            })
            if (!course?._id) throw createHttpError.InternalServerError("دوره ثبت نشد");
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: "دوره با موفقیت ثبت شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(req.body.image)
            next(error);
        }
    }
    async getCourseById(req, res, next) {
        try {
            const { id } = req.params;
            const course = await this.checkCourseExist(id);
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    course
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async addChapter(req, res, next) {
        try {
            await addChapterSchema.validateAsync(req.body);
            const { id, text, title } = req.body;
            await this.checkCourseExist(id);
            const pushChapterResult = await CoursesModel.updateOne({ _id: id }, {
                $push: {
                    chapters: { title, text, episodes: [] }
                }
            })
            if (pushChapterResult.modifiedCount == 0) {
                throw createHttpError.InternalServerError("فصل  به دوره اضافه نشد");
            }
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: "فصل با موفقیت به دوره اضافه شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async updateCourse(req, res, next) {
        try {
            const { id } = req.params;
            const course = await this.checkCourseExist(id);
            if (req?.body?.fileUploadPath && req?.body?.filename) {
                req.body.image = path.join(req.body.fileUploadPath, req.body.filename);
                deleteFileInPublic(course.image);
            }
            const blackListField = Object.values(CourseBlackList);
            const data = req.body;
            deleteInvalidValue(data, blackListField);
            const updateCourseResult = await CoursesModel.updateOne({ _id: course._id }, { $set: data });
            if (updateCourseResult.modifiedCount == 0) {
                throw createHttpError.InternalServerError("به روز رسانی  انجام نشد");
            }
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "به روز رسانی انجام شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async checkCourseExist(id) {
        await objectIdValidator.validateAsync({ id });
        console.log(id);
        const course = await CoursesModel.findById(id);
        if (!course) throw createHttpError.NotFound("دوره ای یافت نشد");
        return course;
    }
}
module.exports = {
    CourseController: new CourseController()
}