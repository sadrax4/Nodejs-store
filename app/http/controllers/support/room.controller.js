const { StatusCodes } = require("http-status-codes");
const Controller = require("../controller");
const createHttpError = require("http-errors");
const { addRoomValidator } = require("../../../validator/support/support.schema");
const { ConversaionModel } = require("../../../models/conversion");
const { removeWithSpace, deleteFileInPublic } = require("../../../utils/function");
const path = require("path");

class RoomController extends Controller {
    async addRoom(req, res, next) {
        try {
            const createRoomData = await addRoomValidator.validateAsync(req.body);
            await this.findConversionByEndpoint(createRoomData.namespace);
            await this.checkExistRoomByName(createRoomData.name);
            createRoomData.image = path.join(createRoomData.fileUploadPath, createRoomData.filename)
            const createRoomResult = await ConversaionModel.updateOne(
                { endpoint: createRoomData.namespace }, { $push: { "rooms": createRoomData } }
            )
            if (!createRoomResult) {
                throw createHttpError.InternalServerError("خطای داخلی")
            }
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: "روم به محیط چت اضافه شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(path.join(req.body.fileUploadPath, req.body.filename))
            next(error);
        }
    }
    async getRooms(req, res, next) {
        try {
            const rooms = await ConversaionModel.find({}, { rooms: 1 });
            if (rooms.length == 0) {
                throw createHttpError.NotFound("روم ای یافت نشد")
            }
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    rooms
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async checkExistRoomByName(name) {
        const room = await ConversaionModel.findOne({ "rooms.name": name })
        if (room) {
            throw createHttpError.NotFound("روم ای با نام قبلا ثبت شده است ")
        }
        return;
    }
    async findConversionByEndpoint(endpoint) {
        const conversion = await ConversaionModel.findOne({ endpoint })
        if (!conversion) {
            throw createHttpError.NotFound("محیط چت یافت نشد")
        }
        return conversion;
    }
}
module.exports = {
    RoomController: new RoomController()
}