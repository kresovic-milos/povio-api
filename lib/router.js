const router = require('express').Router();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const authAPI = require('./api/auth/authAPI');
const profileAPI = require('./api/profile/profileAPI');
const usersAPI = require('./api/users/usersAPI');

router.use('/auth', authAPI);
router.use('/me', profileAPI);
router.use('/users', usersAPI);

const swaggerSpec = swaggerJSDoc({
  definition: {
    info: {
      title: 'Povio Labs API',
      version: 1
    },
    host: `localhost:5432`,
    basePath: '/api'
  },
  apis: ['lib/api/**/*.js', 'lib/router.js']
});
router.get('/docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
