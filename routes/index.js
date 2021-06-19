const userMiddleware = require('../middlewares/user');
const hueKeyMiddleware = require('../middlewares/hueKey');

const routes = [
  require('./configuration'),
  require('./clip'),
  require('./lights'),
  require('./groups')
]

module.exports = (router, client) => {
  routes.forEach(route => route(router, client, userMiddleware, hueKeyMiddleware));
}