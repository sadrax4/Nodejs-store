/**
 * @swagger
 *  components:
 *       schemas:
 *          AddRole:
 *             type: object
 *             required:
 *                -   title
 *                -   permissions
 *                -   description
 *             properties:
 *                 title:
 *                    type: string
 *                    description: the title of role
 *                 description:
 *                     type: string
 *                     description: the description of role
 *                 permissions:
 *                     type: array
 *                     description: list of role
 *          EditRole:
 *             type: object
 *             properties:
 *                 title:
 *                    type: string
 *                    description: the title of role
 *                 description:
 *                     type: string
 *                     description: the description of role
 *                 permissions:
 *                     type: array
 *                     description: list of role
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
 *  definitions:
 *      listOfCourses:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: "200"
 *              data:
 *                  type: object
 *                  properties:
 *                      courses:
 *                          type: array 
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "647cca7e479a16b2452030c2"
 *                                  permissions:
 *                                      type: object
 *                                      items:
 *                                          type: string
 *           
 */
/**
 * @swagger
 * /admin/role/add:
 *    post:
 *      summary: create role
 *      description: create role
 *      tags: [role(admin-panel)]
 *      requestBody:
 *          required: true
 *          content:
 *                application/x-www-form-urlencoded: 
 *                     schema:
 *                         $ref: "#/components/schemas/AddRole"      
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
 * /admin/role/list:
 *    get:
 *      summary: get role
 *      description: get list of all role
 *      tags: [role(admin-panel)]     
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
 * /admin/role/remove/{field}:
 *    delete:
 *      summary: delete one role
 *      description: delete role by id
 *      tags: [role(admin-panel)]     
 *      parameters:
 *           -  in: path
 *              name: field
 *              required: true
 *              type: string
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
 * /admin/role/update/{id}:
 *    patch:
 *      summary: edit role
 *      description: edit role
 *      tags: [role(admin-panel)]
 *      parameters:
 *           -  in: path
 *              name: id
 *              required: true
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *                application/x-www-form-urlencoded: 
 *                     schema:
 *                         $ref: "#/components/schemas/EditRole"      
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
