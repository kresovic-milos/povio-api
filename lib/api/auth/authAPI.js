const router = require('express').Router();
const { signUp, logIn } = require('./authController');
const { validateBody } = require('../../middlewares/validationMiddleware');
const { signupSchema, loginSchema } = require('./authValidation');

/**
 * @swagger
 * /signup:
 *   post:
 *     description: Creates new user
 *     tags:
 *       - /auth
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: User created successfully
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               type: object
 *       400:
 *         description: Some error
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             status:
 *               type: number
 *             message:
 *               type: string
 */
router.post('/signup', validateBody(signupSchema), signUp);

/**
 * @swagger
 * /login:
 *   post:
 *     description: Retrieves JWT
 *     tags:
 *       - /auth
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Token retrieved successfully
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *       400:
 *         description: Invalid credentials error
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             status:
 *               type: number
 *             message:
 *               type: string
 */
router.post('/login', validateBody(loginSchema), logIn);

module.exports = router;
