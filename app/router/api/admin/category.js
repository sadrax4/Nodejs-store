const { CategoryController } = require("../../../http/controllers/admin/category.controller");

const router = require("express").Router();

/**
 * @swagger
 * /admin/category/add:
 *    post:
 *      summary: add category
 *      description: 
 *      tags: [category(admin-panel)]
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
 *      tags: [category(admin-panel)]
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
 *      tags: [category(admin-panel)]
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
 *      tags: [category(admin-panel)]
 *      responses:   
 *          200:   
 *               description: success
 *          404:
 *               description: not Found      
 */
router.get("/all", CategoryController.getAllCategory);


/**
 * @swagger
 * /admin/category/list-of-all:
 *    get:
 *      summary: get all categories
 *      description:  get category without nested  structure
 *      tags: [category(admin-panel)]
 *      responses:   
 *          200:   
 *               description: success
 *          404:
 *               description: not Found      
 */
router.get("/list-of-all", CategoryController.getAllCategoryWithout);


/**
 * @swagger
 * /admin/category/update/{id}:
 *    patch:
 *      summary: update category
 *      description:  update category by id 
 *      tags: [category(admin-panel)]
 *      parameters:
 *         - name: id
 *           description: id of category
 *           in: path
 *           type: string
 *           required: true
 *         - name: title
 *           description: title of category
 *           type: string
 *           in: formData
 *      responses:   
 *          200:   
 *               description: success
 *          404:
 *               description: not Found      
 */
router.patch("/update/:id", CategoryController.editCategoryTitle);


/**
 * @swagger
 * /admin/category/{id}:
 *    get:
 *      summary: category by id
 *      description:  get category by object-id
 *      tags: [category(admin-panel)]
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
router.get("/:id", CategoryController.getCategoryById);
module.exports = {
    CategoryRoutes: router
}