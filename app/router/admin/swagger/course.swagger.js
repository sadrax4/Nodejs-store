/**
 * @swagger
 *  components:
 *       schemas:
 *          Types:
 *              type: string
 *              enum:
 *                  - lock
 *                  - cash
 *                  - special    
 *          AddCourse:
 *             type: object
 *             required:
 *                -   title
 *                -   text
 *                -   short_text
 *                -   price
 *                -   discount
 *                -   type
 *                -   image
 *                -   tags
 *                -   category
 *             properties:
 *                 title:
 *                    type: string
 *                    description: the title of course
 *                 text:
 *                    type: string
 *                    description: the text of course
 *                 short_text:
 *                    type: string
 *                    description: the short-text of course
 *                 price:
 *                    type: string
 *                    description: the price of course
 *                 discount:
 *                    type: string
 *                    description: the discount of course
 *                 image:
 *                    type: file
 *                    format: binary
 *                 tags:
 *                    type: array
 *                    description: the tags of course
 *                 category:
 *                    type: string
 *                    description: the category of course         
 *                 type:
 *                    $ref: "#/components/schemas/Types"
 * 
 *          UpdateCourse:
 *             type: object
 *             properties:
 *                 title:
 *                    type: string
 *                    description: the title of course
 *                 text:
 *                    type: string
 *                    description: the text of course
 *                 short_text:
 *                    type: string
 *                    description: the short-text of course
 *                 price:
 *                    type: string
 *                    description: the price of course
 *                 discount:
 *                    type: string
 *                    description: the discount of course
 *                 image:
 *                    type: file
 *                    format: binary
 *                 tags:
 *                    type: array
 *                    description: the tags of course
 *                 category:
 *                    type: string
 *                    description: the category of course         
 *                 type:
 *                    $ref: "#/components/schemas/Types"
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
 *                                  title:
 *                                      type: string
 *                                      example: "title"
 *                                  short_text:
 *                                      type: string
 *                                      example: "short_text"
 *                                  tags:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                                          example: "tags1,tags2"
 *                                  category:
 *                                      type: string
 *                                      example: "64569ac147077bf457026626"
 *                                  likse:
 *                                      type: integer
 *                                      example: "20"
 *                                  dislikes:
 *                                      type: integer
 *                                      example: "5"
 *                                  price:
 *                                      type: integer
 *                                      example: "200000"
 *                                  discount:
 *                                      type: integer
 *                                      example: "%20"
 *                                  type:
 *                                      type: string
 *                                      example: "free"
 *                                  status:
 *                                      type: string
 *                                      example: "notStarted"
 *                                  teacher:
 *                                      type: string
 *                                      example: "sadra x4"
 *                                  students:
 *                                      type: integer
 *                                      example: "200"
 *           
 */
/**
 * @swagger
 * /admin/courses/add:
 *    post:
 *      summary: create Course
 *      description: create Course
 *      tags: [course(admin-panel)]
 *      requestBody:
 *          required: true
 *          content:
 *                multipart/form-data: 
 *                     schema:
 *                         $ref: "#/components/schemas/AddCourse"      
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
 * /admin/courses/update/{id}:
 *    post:
 *      summary: edit Course
 *      description: edit Course by id
 *      tags: [course(admin-panel)]
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *                multipart/form-data: 
 *                     schema:
 *                         $ref: "#/components/schemas/UpdateCourse"      
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
 * /admin/courses/list:
 *    get:
 *      summary: get courses
 *      description: get list of all course
 *      tags: [course(admin-panel)]     
 *      responses:   
 *          200:   
 *               description: success
 *               content:
 *                    application/json:
 *                        schema:
 *                            $ref: "#/definitions/listOfCourses"  
 *          404:
 *               description: not Found      
 */
/**
 * @swagger
 * /admin/courses/search:
 *    get:
 *      summary: search courses
 *      description:  search in text,title,short text of Course
 *      tags: [course(admin-panel)]     
 *      parameters:
 *          -   in: query
 *              name: search
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
 * /admin/courses/{id}:
 *    get:
 *      summary: get one course
 *      description: get course by id
 *      tags: [course(admin-panel)]     
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
