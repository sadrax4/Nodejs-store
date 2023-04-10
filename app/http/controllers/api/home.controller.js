const Controller = require("../controller");

class HomeController extends Controller {
    indexPage(req, res, next) {
        return res.status(200).send("index page store")
    }
}
module.exports = {
    homeController: new HomeController()
}