const router = require('express').Router();
const { getByMostLiked, getById, like, unlike } = require('./usersController');
const { authenticateStrict, authenticateWeak } = require('../../middlewares/authMiddleware');

/**
 * @swagger
 * /users/most-liked:
 *   get:
 *     description: Get users ordered by the likes count, descending
 *     tags:
 *       - /users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *         schema:
 *           type: object
 *           properties:
 *             users:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Some error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */
router.get('/most-liked', authenticateWeak, getByMostLiked);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     description: Get user object by id
 *     tags:
 *       - /users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User fetched successfully
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               type: object
 *       500:
 *         description: Some error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */
router.get('/:id', authenticateWeak, getById);

/**
 * @swagger
 * /users/like:
 *   get:
 *     description: Creates like relation between users
 *     tags:
 *       - /users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Liked successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       500:
 *         description: Some error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */
router.post('/:id/like', authenticateStrict, like);

/**
 * @swagger
 * /users/unlike:
 *   get:
 *     description: Removes like relation between users
 *     tags:
 *       - /users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Unliked successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       500:
 *         description: Some error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */
router.post('/:id/unlike', authenticateStrict, unlike);

module.exports = router;
