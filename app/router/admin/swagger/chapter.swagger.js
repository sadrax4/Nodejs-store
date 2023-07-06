/**
 * @swagger
 *  components:
 *       schemas:
 *          UpdateChapter:
 *              type: object
 *              required:
 *                  -    title
 *                  -    text
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of chapter
 *                  text: 
 *                      type: string 
 *                      description: the describe about of chapter
 *          AddChapter:
 *              type: object
 *              required:
 *                  -    id
 *                  -    title
 *                  -    text
 *              properties:
 *                  id:
 *                      type: string
 *                      description: the id of course to insert chapter
 *                  title:
 *                      type: string
 *                      description: the title of chapter
 *                  text: 
 *                      type: string 
 *                      description: the describe about of chapter
 */
/**
 * @swagger 
 *  definitions:
 *      listOfChapter:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: "20x"
 *              data:
 *                  type: object
 *                  properties:
 *                      course:
 *                          type: array
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
 * /admin/chapter/add:
 *    put:
 *      summary: create chapter
 *      description: create chpater too insert in course
 *      tags: [chapter(admin-panel)]
 *      requestBody:
 *          required: true
 *          content:
 *                application/x-www-form-urlencoded: 
 *                     schema:
 *                         $ref: "#/components/schemas/AddChapter"      
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
 * /admin/chapter/list/{id}:
 *    get:
 *      summary: list of  chapter
 *      description: get chpater of course
 *      tags: [chapter(admin-panel)]
 *      parameters:    
 *          -    in: path
 *               type: string
 *               name: id
 *               required: true     
 *      responses:   
 *          200:   
 *               description: success
 *               content:
 *                   application/json:
 *                      schema:
 *                          $ref: "#/definitions/listOfChapter"
 *          404:
 *               description: not Found      
 */
/**
 * @swagger
 * /admin/chapter/list:
 *    get:
 *      summary: list of  chapter
 *      description: get chpater of course
 *      tags: [chapter(admin-panel)]    
 *      responses:   
 *          200:   
 *               description: success
 *               content:
 *                   application/json:
 *                      schema:
 *                          $ref: "#/definitions/listOfChapter"
 *          404:
 *               description: not Found      
 */
/**
 * @swagger
 * /admin/chapter/remove/{chapterID}:
 *    patch:
 *      summary: remove chapter of course
 *      description: remove chpater of course by id
 *      tags: [chapter(admin-panel)]
 *      parameters:    
 *          -    in: path
 *               type: string
 *               name: chapterID
 *               required: true       
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
 * /admin/chapter/update/{chapterID}:
 *    patch:
 *      summary: edit one chapter
 *      description: edit chapter by id 
 *      tags: [chapter(admin-panel)]     
 *      parameters:
 *           -  in: path
 *              name: chapterID
 *              required: true
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *                application/x-www-form-urlencoded: 
 *                     schema:
 *                         $ref: "#/components/schemas/UpdateChapter"
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