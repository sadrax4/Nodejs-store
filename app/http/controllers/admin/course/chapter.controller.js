const createHttpError = require("http-errors");
const { CoursesModel } = require("../../../../models/course");
const { addChapterSchema } = require("../../../../validator/admin/course.schema");
const { objectIdValidator } = require("../../../../validator/public.validator");
const Controller = require("../../controller");
const { CourseController } = require("./course.controller");
const { StatusCodes } = require("http-status-codes");
const { deleteInvalidValue } = require("../../../../utils/function");

class ChapterController extends Controller {

    async addChapter(req, res, next) {
        try {
            await addChapterSchema.validateAsync(req.body);
            const { id, text, title } = req.body;
            await CourseController.checkCourseExist(id);
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
    async removeChapter(req, res, next) {
        try {
            const { chapterID } = req.params;
            await this.getOneChapter(chapterID);
            const removeChapterResult = await CoursesModel.updateOne({ "chapters._id": chapterID }, {
                $pull: {
                    chapters: {
                        _id: chapterID
                    }
                }
            })
            if (removeChapterResult.modifiedCount == 0) {
                throw new createHttpError.InternalServerError("فصل از دوره حذف نشد !");
            }
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: "فصل با موفقیت از دوره حذف نشد"
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async updateChapterById(req, res, next) {
        try {
            const { chapterID } = req.params;
            await this.getOneChapter(chapterID);
            const data = req.body;
            deleteInvalidValue(data, ["_id"]);
            const updateChapterResult = await CoursesModel.updateOne(
                { "chapters._id": chapterID },
                { $set: { "chapters.$": data } }
            )
            if (updateChapterResult.modifiedCount == 0) {
                throw createHttpError.InternalServerError("به روز رسانی  فصل انجام نشد !");
            }
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "به روز رسانی فصل با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async getAllChapter(req, res, next) {
        try {
            const chapters = await CoursesModel.aggregate([
                // {
                //     $lookup: {
                //         from: "courses",
                //         localField: "chapters.episodes._id",
                //         foreignField: "_id",
                //         as: "episodes"
                //     }
                // }, 
                {
                    $project: {
                        "chapters.episodes": 1
                    }
                }
            ]);
            //const chapters = await CoursesModel.find({});
            if (!chapters) {
                throw createHttpError.NotFound("فصلی یافت نشد")
            }
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    chapters
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async ChapterOfCourse(req, res, next) {
        try {
            const { id } = req.params;
            const course = await this.getChapterOfCourse(id);
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
    async getChapterOfCourse(id) {
        await objectIdValidator.validateAsync({ id });
        const chapter = await CoursesModel.findOne({ _id: id }, { chapters: 1, title: 1 });
        if (!chapter) throw createHttpError.NotFound("فصل ای یافت نشد");
        return chapter;
    }
    async getOneChapter(id) {
        await objectIdValidator.validateAsync({ id });
        const chapters = await CoursesModel.findOne({ "chapters._id": id }, { "chapters.$": 1 });
        if (!chapters) throw createHttpError.NotFound("فصلی یافت نشد")
        return chapters;
    }
}
module.exports = {
    ChapterController: new ChapterController()
}