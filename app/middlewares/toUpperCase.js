const toUpperCase = function (field) {
    return function (req, res, next) {
        if (req.body[field]) {
            if (typeof req.body[field] == 'string') {
                req.body[field] = String(req.body[field]).toUpperCase();
            }
        }
        next();
    }
}
module.exports = {
    toUpperCase
}