const { ProductController } = require("../../../http/controllers/admin/product.controller");
const { stringToArray } = require("../../../middlewares/ stringToArray");
const uploadFile = require("../../../utils/multer");
const router = require("express").Router();

/**
 * @swagger
 *  components:
 *       schemas:
 *          AddProduct:
 *             type: object
 *             required:
 *                -   title
 *                -   text
 *                -   short_text
 *                -   price
 *                -   discount
 *                -   count
 *                -   images
 *                -   tags
 *                -   category
 *             properties:
 *                 title:
 *                    type: string
 *                    description: the title of product
 *                 text:
 *                    type: string
 *                    description: the text of product
 *                 short_text:
 *                    type: string
 *                    description: the short-text of product
 *                 price:
 *                    type: string
 *                    description: the price of product
 *                 discount:
 *                    type: string
 *                    description: the discount of product
 *                 count:
 *                    type: string
 *                    description: the count of product
 *                 images:
 *                    type: array
 *                    items:
 *                        type: string
 *                        format: binary
 *                 tags:
 *                    type: array
 *                    description: the tags of product
 *                 category:
 *                    type: string
 *                    description: the category of product         
 *                 height:
 *                    type: string
 *                    description: the height of product package
 *                 weight:
 *                    type: string
 *                    description: the weight of product package
 *                 width:
 *                    type: string
 *                    description: the width of product package
 *                 length:
 *                    type: string
 *                    description: the length of product package 
 */


/**
 * @swagger
 * /admin/product/add:
 *    post:
 *      summary: create product
 *      description: create product
 *      tags: [product(admin-panel)]
 *      requestBody:
 *          required: true
 *          content:
 *                multipart/form-data: 
 *                     schema:
 *                         $ref: "#/components/schemas/AddProduct"      
 *      responses:   
 *          200:   
 *               description: success
 *          404:
 *               description: not Found      
 */
router.post("/add", uploadFile.array("images", 10), stringToArray("tags"), ProductController.addProduct);

// router.get();
// router.get();
// router.get();
// router.get();

module.exports = {
   productApiRouter: router
}