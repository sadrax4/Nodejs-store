const { UserModel } = require("../../../models/users");
const { signTokenGenerator } = require("../../../utils/function");
const { mobileValidator } = require("../../../validator/support/support.schema");
const Controller = require("../controller");
let error;
class SupportController extends Controller {
    async renderChat(req, res, next) {
        try {
            return res.render("chat.ejs", { layout: './layouts/master' })
        } catch (error) {
            next(error);
        }
    }
    async renderLogin(req, res, next) {
        try {
            return res.render("login.ejs", { error: undefined, layout: './layouts/master' })
        } catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const { value: mobile } = mobileValidator.validate(req.body);
            if (mobile?.error) {
                error = mobile.error.details[0].message;
                return res.render('login.ejs', { error })
            }
            const user = await UserModel.findOne(mobile, { _id: 1, mobile: 1, first_name: 1, last_name: 1 });
            if (!user) {
                error = "کاربری با این شماره یافت نشد "
                return res.render('login.ejs', { error });
            }
            const token = await signTokenGenerator(user._id);
            user.token = token;
            user.save();
            res.cookie("authorization", token, {
                signed: true, httpOnly: true, expires: new Date(Date.now() + 1000 * 60 * 60 * 1)
            })
            return res.redirect("/support/chat");
        } catch (error) {
            next(error);
        }
    }
}
module.exports = {
    SupportController: new SupportController()
}