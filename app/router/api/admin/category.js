const { CategoryController } = require("../../../http/controllers/admin/category.controller");

const router = require("express").Router();

/**
 * @swagger
 * /admin/category/add:
 *    post:
 *      summary: add category
 *      description: 
 *      tags: [admin-panel]
 *      parameters:
 *         - name: title
 *           description: select title of category
 *           in: formData
 *           required: true
 *         - name: parent
 *           description: select parent of category
 *           in: formData
 *           required: false
 *      responses:   
 *          200:   
 *               description: success
 *          404:
 *               description: not Found      
 */
router.post("/add", CategoryController.addCategory);
/**
 * @swagger
 * /admin/category/parents:
 *    get:
 *      summary:  parents
 *      description:  get all parents of category
 *      tags: [admin-panel]
 *      responses:   
 *          200:   
 *               description: success
 *          404:
 *               description: not Found      
 */
router.get("/parents", CategoryController.getParents);

/**
 * @swagger
 * /admin/category/remove/{id}:
 *    delete:
 *      summary: remove category
 *      description:  remove category by id 
 *      tags: [admin-panel]
 *      parameters:
 *         - name: id
 *           description: id of category
 *           in: path
 *           type: string
 *           required: true
 *      responses:   
 *          200:   
 *               description: success
 *          404:
 *               description: not Found      
 */
router.delete("/remove/:id", CategoryController.removeCategory);

/**
 * @swagger
 * /admin/category/all:
 *    get:
 *      summary: get all categories
 *      description:  get chidren of parent category
 *      tags: [admin-panel]
 *      responses:   
 *          200:   
 *               description: success
 *          404:
 *               description: not Found      
 */
router.get("/all", CategoryController.getAllCategory);

/**
 * @swagger
 * /admin/category/all:
 *    get:
 *      summary: get all categories
 *      description:  get chidren of parent category
 *      tags: [admin-panel]
 *      responses:   
 *          200:   
 *               description: success
 *          404:
 *               description: not Found      
 */
router.get("/all", CategoryController.getAllCategory);
module.exports = {
    CategoryRoutes: router
}