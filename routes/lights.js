const LightsController = require('../controllers/lights');

module.exports = (router, client, userMiddleware) => {
    const lightsController = new LightsController(client);
    router.put('/api/:username/lights/:id/state', userMiddleware, lightsController.setLightState);
    router.get('/api/:username/lights/:id', userMiddleware, lightsController.getLight);
    router.get('/api/:username/lights', userMiddleware, lightsController.getLights);
}