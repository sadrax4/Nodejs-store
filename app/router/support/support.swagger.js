/**
 * @swagger
 *  components:
 *       schemas:
 *          AddNamespace:
 *             type: object
 *             required:
 *                -   title
 *                -   endpoint
 *             properties:
 *                 title:
 *                    type: string
 *                    description: the title of namespace
 *                 endpoint:
 *                     type: string
 *                     description: the endpoint of namespace
 *          EditNamespace:
 *             type: object
 *             properties:
 *                 title:
 *                    type: string
 *                    description: the title of namespace
 *                 endpoint:
 *                     type: string
 *                     description: the description of namespace
 *          AddRoom:
 *             type: object
 *             required:
 *                -   name
 *                -   description
 *                -   image
 *                -   namespace
 *             properties:
 *                 name:
 *                    type: string
 *                    description: the name of room
 *                 description:
 *                     type: string
 *                     description: the description of room
 *                 image:
 *                     type: file
 *                     description: upload file of room
 *                 namespace:
 *                     type: string
 *                     description: the namespace 
 *          EditRoom:
 *             type: object
 *             properties:
 *                 name:
 *                    type: string
 *                    description: the name of room
 *                 description:
 *                     type: string
 *                     description: the description of room
 *                 image:
 *                     type: file
 *                     description: upload file of room
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
 */
/**
 * @swagger
 * /namespace/add:
 *    post:
 *      summary: create namespace
 *      description: create namespace
 *      tags: [support]
 *      requestBody:
 *          required: true
 *          content:
 *                application/x-www-form-urlencoded: 
 *                     schema:
 *                         $ref: "#/components/schemas/AddNamespace"      
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
 * /room/add:
 *    post:
 *      summary: create room
 *      description: create room
 *      tags: [support]
 *      requestBody:
 *          required: true
 *          content:
 *                multipart/form-data: 
 *                     schema:
 *                         $ref: "#/components/schemas/AddRoom"      
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
 * /namespace/list:
 *    get:
 *      summary: get namespace
 *      description: get list of all namespace
 *      tags: [support]     
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
 * /room/list:
 *    get:
 *      summary: get room
 *      description: get list of all room
 *      tags: [support]     
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
