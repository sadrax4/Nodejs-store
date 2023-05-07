const { authController } = require('../../http/controllers/user/auth/auth.controller');

const router = require('express').Router();
/**
 * @swagger
 *  tags:
 *    name: user-authenticated
 *    description: login with otp
 * 
 * @swagger
 *  /user/get-otp:
 *    post:
 *     tags:
 *          [user-authenticated]
 *     summary: login user in userpanel with phone number
 *     description: one time password (OTP) login
 *     parameters:
 *         -   name: mobile
 *             description: fa-IR phone number
 *             in: formData
 *             required: true
 *             type: string
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
 *     description: check-opt with code-mobile and expires date
 *     parameters:
 *         -   name: mobile
 *             description: fa-IR phone number
 *             in: formData
 *             required: true
 *             type: string
 *         -   name: code
 *             description: enter sms code recived
 *             in: formData
 *             required: true
 *             type: string
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
*     parameters:
*         -   name: refresh-token
*             in: body
*             required: true
*             type: string
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