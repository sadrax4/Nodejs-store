const { CategoryController } = require("../../../http/controllers/admin/category.controller");

const router = require("express").Router();

/**
 * @swagger 
 *  components:
 *      schemas:
 *          AddCategory:
 *               type: object
 *               required: 
 *                  -   title
 *               properties:
 *                    title:
 *                      type: string
 *                      description: enter title of category
 *                    parent:
 *                      type: string
 *                      description: enter mongo id of parent category
 *          EditCategoryTitle:
 *               type: object
 *               required:
 *                  -   title
 *               properties: 
 *                    title: 
 *                      type: string
 *                      description: edit title of category
 */

/**
 * @swagger
 * /admin/category/add:
 *    post:
 *      summary: add category
 *      description: 
 *      tags: [category(admin-panel)]
 *      requestBody:
 *          requried: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema: 
 *                     $ref: "#/components/schemas/AddCategory"
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
 *      description:  get all parent of category
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
 *         -   in: path
 *             name: id
 *             required: true
 *             description: enter id to remove category
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
 * /admin/category/update-title/{id}:
 *    patch:
 *      summary: update category
 *      description:  update category by id 
 *      tags: [category(admin-panel)]
 *      parameters:
 *         -   in: path
 *             name: id
 *             required: true
 *             description: enter id to edit title
 *      requestBody:
 *          requried: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema: 
 *                     $ref: "#/components/schemas/EditCategoryTitle"
 *      responses:   
 *          200:   
 *               description: success
 *          404:
 *               description: not Found      
 */
router.patch("/update-title/:id", CategoryController.editCategoryTitle);


/**
 * @swagger
 * /admin/category/{id}:
 *    get:
 *      summary: category by id
 *      description:  get category by object-id
 *      tags: [category(admin-panel)]
 *      parameters:
 *         -   in: path
 *             name: id
 *             required: true
 *             description: enter id to find category
 *      responses:   
 *          200:   
 *               description: success
 *          404:
 *               description: not Found      
 */
router.get("/:id", CategoryController.getCategoryById);
module.exports = {
    CategoryApiRouter: router
}