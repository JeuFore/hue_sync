module.exports = function Groups() {
    async function getGroup(req, res) {
        res.status(200).json({
            "action": {
                "on": true,
                "hue": 0,
                "effect": "none",
                "bri": 100,
                "sat": 100,
                "ct": 500,
                "xy": [0.5, 0.5]
            },
            "lights": [
                "1",
                "2",
                "3"
            ],
            "state": { "any_on": true, "all_on": true }, "type": "Room", "class": "Bedroom", "name": "Master bedroom",
        })
    }

    async function setGroup(req, res) {
        console.log(req.body)

        res.status(200).json([
            { "success": { "/groups/1/lights": ["1"] } },
            { "success": { "/groups/1/name": "Bedroom" } }
        ])
    }

    async function getGroups(req, res) {
        res.status(200).json({
            "1": {
                "name": "Group 1",
                "lights": [
                    "1",
                    "2",
                    "3"
                ],
                "type": "LightGroup",
                "action": {
                    "on": true,
                    "bri": 254,
                    "hue": 10000,
                    "sat": 254,
                    "effect": "none",
                    "xy": [
                        0.5,
                        0.5
                    ],
                    "ct": 250,
                    "alert": "select",
                    "colormode": "ct"
                }
            }
        })
    }

    return Object.freeze({
        getGroup,
        setGroup,
        getGroups
    });
}