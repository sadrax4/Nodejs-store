const { emailSender } = require("../../../../utils/initNodemailer");
const Controller = require("../../controller");
class EmailController extends Controller {
    async sendEmail(req, res, next) {
        try {
            const { to, subject, text } = req;
            // emailSender
            console.log(req.body)
            return res.json(req.body)

        } catch (error) {
            next(error);
        }
    }
}
module.exports = {
    EmailController: new EmailController()
}