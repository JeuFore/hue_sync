const groups = require('../config/groups')

module.exports = function Groups() {
    async function getGroup(req, res) {
        res.status(200).json(groups[req.params.id])
    }

    async function setGroup(req, res) {
        res.status(200).json([
            {
                "success": {}
            }
        ])
    }

    async function createGroup(req, res) {
        console.log(req.body)
        res.status(200).json([{ "success": { "id": "1" } }])
    }

    async function getGroups(req, res) {
        res.status(200).json(groups)
    }

    return Object.freeze({
        getGroup,
        setGroup,
        getGroups,
        createGroup
    });
}