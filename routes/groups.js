const GroupsController = require('../controllers/groups');

module.exports = (router, client, userMiddleware) => {
    const groupsController = new GroupsController();
    router.get('/api/:username/groups/:id', userMiddleware, groupsController.getGroup);
    router.put('/api/:username/groups/:id', userMiddleware, groupsController.setGroup);
    router.get('/api/:username/groups', userMiddleware, groupsController.getGroups)
}