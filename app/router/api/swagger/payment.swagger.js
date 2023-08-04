/**
 * @swagger 
 *  components:
 *      schemas:
 *          FindTransactions:
 *               type: object
 *               properties:
 *                     user:
 *                      type: string
 *                      description: the id of user 
 *                     authority:
 *                      type: string
 *                      description: the authority of payment
 *                     refID:
 *                      type: string
 *                      description: the refID of payment
 *                     invoiceNumber:
 *                      type: string
 *                      description: the invoice number of payment
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
 * /payment:
 *    post:
 *      summary: payment
 *      description: payment method
 *      tags: [payment-and-basket]
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
 * /transaction-list:
 *    post:
 *      summary: list of  payment
 *      description: get list of payment  with user id , authority, ref id, invoice number
 *      tags: [payment-and-basket]
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema: 
 *                     $ref: "#/components/schemas/FindTransactions"
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
 * /total-income:
 *    get:
 *      summary: income
 *      description: get total  income
 *      tags: [payment-and-basket]
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