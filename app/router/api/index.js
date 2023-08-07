const router = require("express").Router();
const { homeController } = require("../../http/controllers/api/home.controller");
const { verifyToken } = require("../../middlewares/verifyToken");
/**
 * @swagger
 *  tags: 
 *    name : index page
 *    description: api of main page
 *
 * @swagger
 * /:
 *  get:
 *      summary: index of routes
 *      description: get all need data fo index page
 *      tags:
 *           [index page]
 *      parameters:
 *         - name: accesstoken
 *           description: Bearer token
 *           in: header
 *           example: Bearer yourToken
 *      responses:   
 *          200:   
 *               description: success
 *          404:
 *               description: not Found             
 */
router.get("/", homeController.indexPage);
module.exports = {
    homeRouter: router
}
