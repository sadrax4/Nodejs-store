/**
 * @swagger
 *  components:
 *       schemas:
 *          AddProduct:
 *             type: object
 *             required:
 *                -   title
 *                -   text
 *                -   short_text
 *                -   price
 *                -   discount
 *                -   count
 *                -   images
 *                -   tags
 *                -   category
 *             properties:
 *                 title:
 *                    type: string
 *                    description: the title of product
 *                 text:
 *                    type: string
 *                    description: the text of product
 *                 short_text:
 *                    type: string
 *                    description: the short-text of product
 *                 price:
 *                    type: string
 *                    description: the price of product
 *                 discount:
 *                    type: string
 *                    description: the discount of product
 *                 count:
 *                    type: string
 *                    description: the count of product
 *                 images:
 *                    type: array
 *                    items:
 *                        type: string
 *                        format: binary
 *                 tags:
 *                    type: array
 *                    description: the tags of product
 *                 category:
 *                    type: string
 *                    description: the category of product         
 *                 height:
 *                    type: string
 *                    description: the height of product package
 *                 weight:
 *                    type: string
 *                    description: the weight of product package
 *                 width:
 *                    type: string
 *                    description: the width of product package
 *                 length:
 *                    type: string
 *                    description: the length of product package
 * 
 *          EditProduct:
 *             type: object
 *             properties:
 *                 title:
 *                    type: string
 *                    description: the title of product
 *                 text:
 *                    type: string
 *                    description: the text of product
 *                 short_text:
 *                    type: string
 *                    description: the short-text of product
 *                 price:
 *                    type: string
 *                    description: the price of product
 *                 discount:
 *                    type: string
 *                    description: the discount of product
 *                 count:
 *                    type: string
 *                    description: the count of product
 *                 images:
 *                    type: array
 *                    items:
 *                        type: string
 *                        format: binary
 *                 tags:
 *                    type: array
 *                    description: the tags of product
 *                 category:
 *                    type: string
 *                    description: the category of product         
 *                 height:
 *                    type: string
 *                    description: the height of product package
 *                 weight:
 *                    type: string
 *                    description: the weight of product package
 *                 width:
 *                    type: string
 *                    description: the width of product package
 *                 length:
 *                    type: string
 *                    description: the length of product package  
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
 * /admin/product/add:
 *    post:
 *      summary: create product
 *      description: create product
 *      tags: [product(admin-panel)]
 *      requestBody:
 *          required: true
 *          content:
 *                multipart/form-data: 
 *                     schema:
 *                         $ref: "#/components/schemas/AddProduct"      
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
 * /admin/product/list-new:
 *    get:
 *      summary: get product
 *      description: get list of all product
 *      tags: [product(admin-panel)]     
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
 * /admin/product/list:
 *    get:
 *      summary: get product
 *      description: get list of all product
 *      tags: [product(admin-panel)]     
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
 * /admin/product/remove/{id}:
 *    delete:
 *      summary: delete one product
 *      description: delete product by id
 *      tags: [product(admin-panel)]     
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
 * /admin/product/search:
 *    get:
 *      summary: search  product
 *      description: search product by title,short text ,text 
 *      tags: [product(admin-panel)]     
 *      parameters:
 *           -  in: query 
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
 * /admin/product/update/{id}:
 *    patch:
 *      summary: edit product
 *      description: edit product
 *      tags: [product(admin-panel)]
 *      parameters:
 *           -  in: path
 *              name: id
 *              required: true
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *                multipart/form-data: 
 *                     schema:
 *                         $ref: "#/components/schemas/EditProduct"      
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
 * /admin/product/{id}:
 *    get:
 *      summary: get one product
 *      description: get product by id
 *      tags: [product(admin-panel)]     
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