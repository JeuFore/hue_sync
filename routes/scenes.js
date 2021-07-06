// const ScenesController = require('../controllers/scenes');

module.exports = (router, client, userMiddleware) => {
    //const scenesController = new ScenesController();
    router.post('/api/:username/groups/:id', userMiddleware, (req, res) => {
        console.log(req.body)
        res.json({})
    });
}