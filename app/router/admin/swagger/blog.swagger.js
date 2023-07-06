/**
 * @swagger 
 *  components:
 *      schemas:
 *          AddBlog:
 *               type: object
 *               required: 
 *                  -   title
 *                  -   text
 *                  -   short_text
 *                  -   category
 *                  -   image
 *               properties:
 *                     title:
 *                      type: string
 *                      description: the title of blog
 *                     text:
 *                      type: string
 *                      description: the title of blog
 *                     short_text:
 *                      type: string
 *                      description: the summary of blog
 *                     category:
 *                      type: string
 *                      description: the id of category for foreinfield in blog
 *                     image:
 *                      type: file
 *                      description: the image of blog
 *                     tags:
 *                      type: string
 *                      description: the list of tags 
 *          EditBlog:
 *               type: object
 *               properties:
 *                     title:
 *                      type: string
 *                      description: the title of blog
 *                     text:
 *                      type: string
 *                      description: the title of blog
 *                     short_text:
 *                      type: string
 *                      description: the summary of blog
 *                     category:
 *                      type: string
 *                      description: the id of category for foreinfield in blog
 *                     image:
 *                      type: file
 *                      description: the image of blog
 *                     tags:
 *                      type: string
 *                      description: the list of tags 
 *          RemoveBlog:
 *               type: object
 *               required:
 *                  -   id 
 *               properties:
 *                    id:
 *                      type: string
 *                      description: id of blog too remove 
 *          FindBlogById:
 *               type: object
 *               required:
 *                  -   id 
 *               properties:
 *                    id:
 *                      type: string
 *                      description: id of blog too find 
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
 * /admin/blog/list:
 *    get:
 *      summary: get blog 
 *      description: get list of blog 
 *      tags: [blog(admin-panel)]
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
 * /admin/blog/update/{id}:
 *    patch:
 *      summary: update blog 
 *      description: update blog  
 *      tags: [blog(admin-panel)]
 *      consmes:
 *        - multipart/form-data
 *      parameters:
 *         -   in: path
 *             name: id
 *             required: true
 *             description: enter id of blog to edit
 *      requestBody:
 *          required: true
 *          content:
 *               application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/EditBlog"
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
 * /admin/blog/remove/{id}:
 *    delete:
 *      summary: remove blog 
 *      description: remove blog with id 
 *      tags: [blog(admin-panel)]
 *      consmes:
 *        - multipart/form-data
 *      parameters:
 *         -   in: path
 *             name: id
 *             required: true
 *             description: enter id remove blog
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
 * /admin/blog/add:
 *    post:
 *      summary: create blog 
 *      description: create blog  document
 *      tags: [blog(admin-panel)]
 *      requestBody:
 *           required: true
 *           content:
 *                 multipart/form-data:
 *                     schema:
 *                          $ref: "#/components/schemas/AddBlog"
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
 * /admin/blog/{id}:
 *    get:
 *      summary: find blog
 *      description: find blog by id
 *      tags: [blog(admin-panel)]
 *      parameters:
 *         -   in: path
 *             name: id
 *             required: true
 *             description: enter id to find blog
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