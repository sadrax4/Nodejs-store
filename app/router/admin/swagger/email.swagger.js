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
 * /email/send:
 *    post:
 *      summary: send email too users
 *      description: send email too users 
 *      tags: [user(admin-panel)]     
 *      parameters:
 *          -  in: path
 *             type: string
 *             required: true
 *             name: to
 *          -  in: path
 *             type: string
 *             required: true
 *             name: subject
 *          -  in: path
 *             type: string
 *             required: true
 *             name: text 
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
