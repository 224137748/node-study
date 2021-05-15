'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.post('/api/user', controller.user.create);
  router.get('/api/user', controller.user.index);



  router.post('/auth/jwt/login', controller.userAccess.login);
  router.post('/auth/jwt/logout', controller.userAccess.logout);

  // router.post('/api/user/{id}', controller.user.destroy);
};
