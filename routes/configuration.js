const ConfigurationController = require('../controllers/configuration');

module.exports = (router, client, userMiddleware) => {
    const configurationController = new ConfigurationController();
    router.post('/api', configurationController.createUser);
    router.get('/api/config', configurationController.getConfig);
    router.get('/api/:username', userMiddleware, configurationController.getDataStore);
    router.get('/api/:username/config', configurationController.getUserConfig);
    router.put('/api/:username/config', userMiddleware, configurationController.modifyConfig);
    router.get('/api/:username/capabilities', userMiddleware, configurationController.getCapabilities);

    router.post('/api/:username/lights', userMiddleware, (req, res) => {
        console.log(req.body)
        res.status(200).json([{ "success": { "/lights": "Searching for new devices" } }])
    });

    router.get('/api/:username/sensors', userMiddleware, (req, res) => res.status(200).json({}));

    router.get('/', (req, res) => res.status(200).send('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"><html><head><title>hue personal wireless lighting</title><link rel="stylesheet" type="text/css" href="/index.css"></head><body><div class="philips-header"><img src="/philips-blue.png" class="philips-logo" alt="Philips" /></div><div class="header"><img class="header-logo" src="/hue-logo.png" alt="hue personal wireless lighting" /><img src="/hue-color-line.png" class="colorline" /></div><div class="error">Oops, there appears to be no lighting here</div></body></html>'))
}