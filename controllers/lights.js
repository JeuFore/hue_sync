const lights = require('../config/lights')

module.exports = function Lights(mqttClient) {
    async function setLightState(req, res) {
        let stateReq = req.body

        if (!Object.keys(stateReq).length)
            stateReq = await new Promise(resolve => req.on('data', chunk => {
                resolve(JSON.parse(chunk.toString()))
            }))

        if (!lights[req.params.id])
            return res.status(400).json({ type: 'error' })

        let response = []

        let value = {}

        if (stateReq.xy) {
            response.push({ "success": { "/lights/1/state/xy": stateReq.xy } })
            value.color = {
                x: stateReq.xy[0],
                y: stateReq.xy[1]
            }
        }
        if (stateReq.on === false || stateReq.on === true) {
            response.push({ "success": { "/lights/1/state/on": stateReq.on } })
            value.state = stateReq.on ? 'ON' : 'OFF'
        }
        if (stateReq.hue) {
            response.push({ "success": { "/lights/1/state/hue": stateReq.hue } })
            value.color_temp = stateReq.hue
        }
        if (stateReq.bri) {
            response.push({ "success": { "/lights/1/state/bri": stateReq.bri } })
            value.brightness = stateReq.bri
        }

        mqttClient.publish(`zigbee2mqtt/${lights[req.params.id].name}/set`, JSON.stringify(value))

        return res.status(200).json(response)
    }

    async function getLight(req, res) {
        res.status(200).json(lights[req.params.id])
    }

    async function getLights(req, res) {
        res.status(200).json(lights)
    }

    return Object.freeze({
        setLightState,
        getLight,
        getLights
    });
}