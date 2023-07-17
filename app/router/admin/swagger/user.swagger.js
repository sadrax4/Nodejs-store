/**
 * @swagger
 *  components:
 *       schemas:
 *          UpdateUser:
 *             type: object
 *             properties:
 *                 first_name:
 *                    type: string
 *                    description: first name
 *                 last_name:
 *                    type: string
 *                    description: the last name
 *                 email:
 *                    type: string
 *                    description: the email
 *                 username:
 *                    type: string
 *                    description: the username
 */
/**
 * @swagger 
 *  definitions:
 *      listOfUsers:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: "200"
 *              data:
 *                  type: object
 *                  properties:
 *                      users:
 *                          type: array 
 *                          items:
 *                              type: object
 *                              properties:
 *                                  first_name:
 *                                      type: string
 *                                      example: "sadra"
 *                                  last_name:
 *                                      type: string
 *                                      example: "soleimani"
 *                                  username:
 *                                      type: string
 *                                      example: "sadrax4"
 *                                  roles:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                                          example: "admin,user"
 *                                  email:
 *                                      type: string
 *                                      example: "sadrawm@gmail.com"
 *                                  otp:
 *                                      type: integer
 *                                      example: "20"
 *                                  bills:
 *                                      type: strimg
 *                                      example: "empty"
 *                                  dicount:
 *                                      type: integer
 *                                      example: "200000"
 *                                  birthday:
 *                                      type: string
 *                                      example: "2002/2/3"
 *                                  courses:
 *                                      type: string
 *                                      example: "empty"
 *           
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
 * /admin/user/list:
 *    get:
 *      summary: get users
 *      description: get list of all user
 *      tags: [user(admin-panel)]     
 *      responses:   
 *          200:   
 *               description: success
 *               content:
 *                   application/json:
 *                      schema:
 *                          $ref: "#/definitions/listOfUsers"
 *          404:
 *               description: not Found      
 */
/**
 * @swagger
 * /admin/user/profile:
 *    get:
 *      summary: get profile
 *      description: get list of all user
 *      tags: [user(admin-panel)]     
 *      responses:   
 *          200:   
 *               description: success
 *               content:
 *                   application/json:
 *                      schema:
 *                          $ref: "#/definitions/listOfUsers"
 *          404:
 *               description: not Found      
 */

/**
 * @swagger
 * /admin/user/search/{search}:
 *    get:
 *      summary: search users
 *      description: search user  with ( last name, first name, email, mobile, username)
 *      tags: [user(admin-panel)]     
 *      parameters:
 *          -  in: path
 *             type: string
 *             required: true
 *             name: search
 *      responses:   
 *          200:   
 *               description: success
 *               content:
 *                   application/json:
 *                      schema:
 *                          $ref: "#/definitions/listOfUsers"
 *          404:
 *               description: not Found      
 */
/**
 * @swagger
 * /admin/user/update:
 *    patch:
 *      summary: add category
 *      description: 
 *      tags: [user(admin-panel)]
 *      requestBody:
 *          requried: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema: 
 *                     $ref: "#/components/schemas/UpdateUser"
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