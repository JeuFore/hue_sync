const ClipController = require('../controllers/clip');

module.exports = (router, client, userMiddleware, hueKeyMiddleware) => {
    const clipController = new ClipController();
    router.get('/clip/v2/resource/bridge', hueKeyMiddleware, clipController.getBridge);
    router.get('/clip/v2/resource', hueKeyMiddleware, clipController.getResource);
    router.get('/clip/v2/resource/behavior_instance', hueKeyMiddleware, clipController.getBehavior);
    router.get('/clip/v2/resource/geofence_client', hueKeyMiddleware, clipController.getGeofence);
    router.get('/clip/v2/resource/geolocation', hueKeyMiddleware, clipController.getGeolocation);

    router.get('/eventstream/clip/v2', hueKeyMiddleware, clipController.getEventStream)
}