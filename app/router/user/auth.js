const { authController } = require('../../http/controllers/user/auth/auth.controller');

const router = require('express').Router();

/**
 * @swagger 
 *  components:
 *      schemas:
 *          GetOTP:
 *               type: object
 *               required: 
 *                  -   mobile
 *               properties:
 *                    mobile:
 *                      type: string
 *                      description: get user mobile for sign and signup
 *          CheckOTP:
 *               type: object
 *               required: 
 *                  -   mobile
 *                  -   code
 *               properties:
 *                    mobile:
 *                      type: string
 *                      description: get user mobile for sign and signup
 *                    code:
 *                      type: integer
 *                      description: recieved code from getOTP
 *          RefreshToken:
 *               type: object
 *               required:
 *                  -   refreshtoken 
 *               properties:
 *                    refreshtoken:
 *                      type: string
 *                      description: check refresh token 
 */


/**
 * @swagger
 *  tags:
 *    name: user-authenticated
 *    description: login with otp
 * 
 * @swagger
 *  /user/get-otp:
 *     post:
 *      tags:
 *           [user-authenticated]
 *      summary: login user in userpanel with phone number
 *      description: one time password (OTP) login
 *      requestBody:
 *          required: true
 *          content:
 *                application/x-www-form-urlencoded:
 *                     schema:
 *                         $ref: "#/components/schemas/GetOTP"
 *                application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/GetOTP'
 *      responses: 
 *              400:
 *                  description: bad request
 *              401:
 *                  description: not authorized
 *              500:
 *                  description: internal server error   
 */
router.post("/get-otp", authController.getOtp);

/**
 * @swagger
 *  tags:
 *    name: user-authenticated
 *    description: login with otp
 * 
 * @swagger
 *  /user/check-otp:
 *    post:
 *     tags:
 *          [user-authenticated]
 *     summary: check-otp value in user controller
 *     description: check-otp with code-mobile and expires date
 *     requestBody:
 *         required: true
 *         content:
 *               application/x-www-form-urlencoded:
 *                    schema:
 *                        $ref: "#/components/schemas/CheckOTP" 
 *               application/json:     
 *                    schema:
 *                        $ref: "#/components/schemas/CheckOTP"
 *     responses:
 *             201:
 *                 description: success
 *             400:
 *                 description: bad request
 *             401:
 *                 description: not authorized
 *             500:
 *                 description: internal server error   
 */
router.post("/check-otp", authController.checkOtp);

/**
*  @swagger
*  /user/refresh-token:
*    post:
*     tags:
*          [user-authenticated]
*     summary: refresh token
*     description: fresh token
*     requestBody:
*         required: true
*         content:
*             application/x-www-form-urlencoded:
*                  schema:
*                      $ref: "#/components/schemas/RefreshToken"        
*     responses:
*             201:
*                 description: success
*             400:
*                 description: bad request
*             401:
*                 description: not authorized
*             500:
*                 description: internal server error   
*/
router.post("/refresh-token", authController.refreshToken);
module.exports = {
    authRouter: router
}