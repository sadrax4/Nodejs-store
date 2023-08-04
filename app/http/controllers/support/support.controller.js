const Controller = require("../controller");

class SupportController extends Controller {
    async renderChat(req, res, next) {
        try {
            return res.render("chat.ejs",{layout: './layouts/master' })
        } catch (error) {
            next(error);
        }
    }
}
module.exports = {
    SupportController: new SupportController()
}