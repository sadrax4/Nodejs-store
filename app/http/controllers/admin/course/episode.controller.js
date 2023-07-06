const { StatusCodes } = require("http-status-codes");
const { addEpisodeSchema } = require("../../../../validator/admin/course.schema");
const Controller = require("../../controller");
const path = require("path");
const { getVideoDurationInSeconds } = require("get-video-duration");
const { getTime, deleteFileInPublic, deleteInvalidValue, copyObject } = require("../../../../utils/function");
const { CourseController } = require("./course.controller");
const { CoursesModel } = require("../../../../models/course");
const { isValidObjectId } = require("mongoose");
const createHttpError = require("http-errors");
const { objectIdValidator } = require("../../../../validator/public.validator");


class EpisodeController extends Controller {
    async addEpisode(req, res, next) {
        try {
            const {
                chapterID,
                courseID,
                text,
                title,
                fileUploadPath,
                filename,
                type
            } = await addEpisodeSchema.validateAsync(req.body);
            const videoAddress = path.join(fileUploadPath, filename)
            const second = await getVideoDurationInSeconds(path.join(
                path.join(fileUploadPath, filename)
            ));
            const time = getTime(second);
            await this.isChapterOfCourseExist(chapterID, courseID);
            const episode = {
                chapterID,
                courseID,
                text,
                title,
                type,
                videoAddress,
                time
            }
            const createEpisodeResult = await CoursesModel.updateOne({ "chapters._id": chapterID, _id: courseID }, {
                $push: { "chapters.$.episodes": episode }
            })
            if (createEpisodeResult.modifiedCount == 0) {
                throw createHttpError.InternalServerError("اپیزود به فصل اضافه نشد");
            }
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: " اپیزود با موفقیت ثبت شد"
                }
            })
        } catch (error) {
            const deletePath = path.join(req.body.fileUploadPath, req.body.filename);
            deleteFileInPublic(deletePath)
            next(error);
        }
    }
    async updateEpisode(req, res, next) {
        try {
            const { episodeID } = req.params;
            await objectIdValidator.validateAsync({ id: episodeID });
            const episode = await this.getEpisode(episodeID);
            let blackList = ["_id"];
            if (req?.body?.fileUploadPath && req?.body?.filename) {
                req.body.videoAddress = path.join(req.body.fileUploadPath, req.body.filename)
                const second = await getVideoDurationInSeconds(path.join(
                    path.join(req.body.fileUploadPath, req.body.filename)
                ));
                req.body.time = getTime(second);
                blackList.push("fileUploadPath", "filename");
            } else {
                blackList.push("time", "videoAddress");
            }
            const bodyData = req.body;
            deleteInvalidValue(bodyData, blackList);
            const episodeData = { ...episode, ...bodyData };
            const updateEpisodeResult = await CoursesModel.updateOne(
                { "chapters.episodes._id": episodeID },
                { $set: { 'chapters.$.episodes': episodeData } }
            )
            if (updateEpisodeResult.modifiedCount == 0) {
                throw createHttpError.InternalServerError("اپیزود به روز رسانی نشد")
            }
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    episodeData,
                    message: " اپیزود با موفقیت ثبت شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async removeEpisodes(req, res, next) {
        try {
            const { episodeID } = req.params;
            await this.getOneEpisode(episodeID);
            const removeEpisodesResult = await CoursesModel.updateOne(
                { "chapters.episodes._id": episodeID },
                { $pull: { "chapters.$.episodes": { _id: episodeID } } }
            )
            if (removeEpisodesResult.modifiedCount == 0) {
                throw createHttpError.InternalServerError(" اپیزود  حذف نشد")
            }
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: " اپیزود با موفقیت حذف شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async getAllEpisodes(req, res, next) {
        try {
            const episodes = await this.getEpisodes();
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    episodes
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getOneEpisodeByID(req, res, next) {
        try {
            const { episodeID } = req.params;
            const episodes = await this.getEpisodes(episodeID);
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    episodes
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async isChapterOfCourseExist(chapterID, courseID) {
        await objectIdValidator.validateAsync({ id: chapterID });
        await objectIdValidator.validateAsync({ id: courseID });
        const course = await CourseController.checkCourseExist(courseID);
        let returnFlag = false;
        course.chapters.forEach(item => {
            if (item._id.toString() == chapterID) {
                returnFlag = true;
            }
        })
        if (returnFlag) return;
        else {
            throw createHttpError.NotFound("فصل مورد نظر در دوره ثبت نشده است")
        }
    }
    async getOneEpisode(episodeID) {
        await objectIdValidator.validateAsync({ id: episodeID });
        const course = await CoursesModel.findOne(
            { "chapters.episodes._id": episodeID }, { "chapters.$.episodes": 1 }
        )
        if (!course) {
            throw createHttpError.NotFound("اپیزود ای یافت نشد")
        }
        const episode = course?.chapters[0].episodes[0];
        return copyObject(episode);
    }
    async getEpisodes() {
        const episodes = await CoursesModel.find({}, { "chapters.episodes": 1 });
        if (!episodes) {
            throw createHttpError.NotFound("ابیزود ای یافت نشد")
        }
        return episodes;
    }
}

module.exports = {
    EpisodeController: new EpisodeController()
}