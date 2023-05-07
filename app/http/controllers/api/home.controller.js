const createHttpError = require("http-errors");
const Controller = require("../controller");
const { authSchema } = require("../../../validator/user/auth.schema");

class HomeController extends Controller {
    async indexPage(req, res, next) {
        try {
            return res.status(200).send("index page store")
        } catch (error) {
            next(createHttpError.BadRequest(error.message));
        }
    }
}
module.exports = {
    homeController: new HomeController()
}