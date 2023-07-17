/**
 * @swagger
 *  components:
 *       schemas:   
 *          AddPermissions:
 *             type: object
 *             required:
 *                 -   name
 *                 -   description
 *             properties:
 *                 name:
 *                     type: string
 *                     description: the name of permissions
 *                 description:
 *                     type: string
 *                     description: the description of permission
 *          EditPermissions:
 *             type: object
 *             properties:
 *                 name:
 *                    type: string
 *                    description: the title of permissions
 *                 description: 
 *                    type: string
 *                    description: the description of permissions
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
 *      listOfPermissions:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: "200"
 *              data:
 *                  type: object
 *                  properties:
 *                      permissions:
 *                          type: array 
 *                          items:
 *                              type: object
 *                              properties:
 *                                  name:
 *                                      type: string
 *                                      example: "name of permission"
 *                                  description:
 *                                      type: string
 *                                      example: "description of permission" 
 */
/**
 * @swagger
 * /admin/permissions/add:
 *    post:
 *      summary: create permission
 *      description: create permission
 *      tags: [role(admin-panel)]
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded: 
 *                  schema:
 *                      $ref: "#/components/schemas/AddPermissions"      
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
 * /admin/permissions/list:
 *    get:
 *      summary: get permissions
 *      description: get list of all permission
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
 * /admin/permissions/remove/{id}:
 *    delete:
 *      summary: delete one permission
 *      description: delete permission by id
 *      tags: [role(admin-panel)]     
 *      parameters:
 *           -  in: path
 *              name: id
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
 * /admin/permissions/update/{id}:
 *    patch:
 *      summary: edit permission
 *      description: edit permission
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
 *                         $ref: "#/components/schemas/EditPermissions"      
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
