/**
 * @swagger
 *  components:
 *       schemas:
 *          Types:
 *              type: string
 *              enum:
 *                  - none
 *                  - lock
 *                  - unlock
 *          AddEpisode:
 *             type: object
 *             required:
 *                -   chapterID
 *                -   courseID
 *                -   title
 *                -   text
 *                -   video
 *                -   type
 *             properties:
 *                 courseID:
 *                    type: string
 *                    description: "the course'id episode"
 *                 chapterID:
 *                    type: string
 *                    description: "the chapter'id of episode"
 *                 title:
 *                    type: string
 *                    description: the title of episode
 *                 text:
 *                    type: string
 *                    description: the text of episode
 *                 video: 
 *                    type: file
 *                 type:
 *                    $ref: "#/components/schemas/Types"
 *          EditEpisode:
 *             type: object
 *             properties:
 *                 title:
 *                    type: string
 *                    description: the title of episode
 *                 text:
 *                    type: string
 *                    description: the text of episode
 *                 video: 
 *                    type: file
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
 * /admin/episode/add:
 *    post:
 *      summary: create episode
 *      description: create episode
 *      tags: [episode(admin-panel)]
 *      requestBody:
 *          required: true
 *          content:
 *                multipart/form-data: 
 *                     schema:
 *                         $ref: "#/components/schemas/AddEpisode"      
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
 * /admin/episode/list:
 *    get:
 *      summary: get episode
 *      description: list of  episodes
 *      tags: [episode(admin-panel)]    
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
 * /admin/episode/remove/{episodeID}:
 *    delete:
 *      summary: remove episode
 *      description: remove episode by id 
 *      tags: [episode(admin-panel)]
 *      parameters:
 *          -    in: path
 *               name: episodeID
 *               required: true
 *               type: string     
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
 * /admin/episode/update/{episodeID}:
 *    patch:
 *      summary: update episode
 *      description: update episode 
 *      tags: [episode(admin-panel)]
 *      parameters:
 *          -    in: path
 *               name: episodeID
 *               required: true
 *               type: string    
 *      requestBody:
 *          content:
 *                multipart/form-data:
 *                     schema:
 *                         $ref: "#/components/schemas/EditEpisode"   
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