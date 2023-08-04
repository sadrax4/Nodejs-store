const bcrypt = require("bcrypt");
const { randomNumberGenerator } = require("../utils/function");
const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *    name: developer-routes
 *    description: developer utils
 * 
 * @swagger
 *  /developer/random-number:
 *    get:
 *     tags: [developer-routes]
 *     summary: generate random number
 *     description: get random number
 *     responses:
 *             201:
 *                 description: success
 *             400:
 *                 description: bad request
 *             401:
 *                 description: not authorized
 *             500:
 *                 description: internal server error   
 */

router.get("/random-number", async (req, res, next) => {
    return res.json({
        'random-number': await (randomNumberGenerator().toString())
    });
})
/**
 * @swagger
 *  /developer/password-hash/{password}:
 *    get:
 *     tags:
 *          [developer-routes]
 *     summary: hashing password
 *     description: hash password with params
 *     parameters:
 *         -   name: password
 *             in: path
 *             required: true
 *             type: string
 *     responses:
 *             201:
 *                 description: success
 *             400:
 *                 description: bad request
 *             401:
 *                 description: not authorized
 *             500:
 *                 description: internal server error   
 */

router.get("/password-hash/:password", (req, res, next) => {

    const { password } = req.params;
    const salt = bcrypt.genSaltSync(10);
    return res.json({
        'hash-password': bcrypt.hashSync(password, salt)
    });
})

module.exports = {
    developerRouter: router
}