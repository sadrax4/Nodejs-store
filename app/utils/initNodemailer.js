const nodeMailer = require('nodemailer');
const tranport = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})
module.exports = {
    emailSender: tranport
}