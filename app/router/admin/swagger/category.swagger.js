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
 *  definitions:
 *      publicMessage:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: "20x"
 *              data:
 *                  type: object
 *                  properties:
 *                      message:
 *                          description: "message of response"
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
 *               content:
 *                   application/json:
 *                      schema:
 *                          $ref: "#/definitions/publicMessage"
 *          404:
 *               description: not Found      
 */
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
 *               content:
 *                   application/json:
 *                      schema:
 *                          $ref: "#/definitions/publicMessage"
 *          404:
 *               description: not Found      
 */
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
 *               content:
 *                   application/json:
 *                      schema:
 *                          $ref: "#/definitions/publicMessage"
 *          404:
 *               description: not Found      
 */
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
 *               content:
 *                   application/json:
 *                      schema:
 *                          $ref: "#/definitions/publicMessage"
 *          404:
 *               description: not Found      
 */
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
 *               content:
 *                   application/json:
 *                      schema:
 *                          $ref: "#/definitions/publicMessage"
 *          404:
 *               description: not Found      
 */
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
 *               content:
 *                   application/json:
 *                      schema:
 *                          $ref: "#/definitions/publicMessage"
 *          404:
 *               description: not Found      
 */
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
 *               content:
 *                   application/json:
 *                      schema:
 *                          $ref: "#/definitions/publicMessage"
 *          404:
 *               description: not Found      
 */
