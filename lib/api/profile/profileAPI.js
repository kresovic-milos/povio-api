const router = require('express').Router();
const { getProfile, updatePassword } = require('./profileController');
const { updatePasswordSchema } = require('./profileValidation');
const { validateBody } = require('../../middlewares/validationMiddleware');
const { authenticateStrict } = require('../../middlewares/authMiddleware');

/**
 * @swagger
 * /me:
 *   get:
 *     description: Get profile
 *     tags:
 *       - /me
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Profile fetched successfully
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
router.get('/', authenticateStrict, getProfile);

/**
 * @swagger
 * /me/update-password:
 *   put:
 *     description: Update password
 *     tags:
 *       - /me
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         schema:
 *           type: object
 *           properties:
 *             newPassword:
 *               type: string
 *       500:
 *         description: Some error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */
router.put(
  '/update-password',
  validateBody(updatePasswordSchema),
  authenticateStrict,
  updatePassword
);

module.exports = router;
