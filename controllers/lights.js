const lights = require('../config/lights')

module.exports = function Lights(mqttClient) {
    async function setLightState(req, res) {
        let stateReq = req.body

        if (!Object.keys(stateReq).length)
            stateReq = await new Promise(resolve => {
                let body = [];
                req.on('data', chunk => body.push(chunk))
                    .on('end', () => resolve(JSON.parse(Buffer.concat(body).toString() || '{}')))
            })

        if (!lights[req.params.id])
            return res.status(400).json({ type: 'error' })

        let response = []

        let value = {}

        if (typeof stateReq.on === 'boolean') {
            response.push({ "success": { [`/lights/${req.params.id}/state/on`]: stateReq.on } })
            lights[req.params.id].state.on = stateReq.on
            value.state = stateReq.on ? 'ON' : 'OFF'
        }
        if (typeof stateReq.bri === 'number') {
            response.push({ "success": { [`/lights/${req.params.id}/state/bri`]: stateReq.bri } })
            lights[req.params.id].state.bri = stateReq.bri
            value.brightness = stateReq.bri
        }
        if (typeof stateReq.hue === 'number') {
            response.push({ "success": { [`/lights/${req.params.id}/state/hue`]: stateReq.hue } })
            lights[req.params.id].state.hue = stateReq.hue
            value.color = { hue: stateReq.hue }
        }
        if (typeof stateReq.sat === 'number') {
            response.push({ "success": { [`/lights/${req.params.id}/state/sat`]: stateReq.sat } })
            lights[req.params.id].state.sat = stateReq.sat
            if (value.color)
                value.color.saturation = stateReq.sat
            else
                value.color = { saturation: stateReq.sat }
        }
        if (Array.isArray(stateReq.xy)) {
            response.push({ "success": { [`/lights/${req.params.id}/state/xy`]: stateReq.xy } })
            lights[req.params.id].state.xy = stateReq.xy
            if (value.color) {
                value.color.x = stateReq.xy[0]
                value.color.y = stateReq.xy[1]
            }
            else
                value.color = {
                    x: stateReq.xy[0],
                    y: stateReq.xy[1]
                }
        }
        if (typeof stateReq.ct === 'number') {
            response.push({ "success": { [`/lights/${req.params.id}/state/ct`]: stateReq.ct } })
            lights[req.params.id].state.ct = stateReq.ct
            value.color_temp = stateReq.ct
        }
        if (typeof stateReq.alert === 'string') {
            response.push({ "success": { [`/lights/${req.params.id}/state/alert`]: stateReq.alert } })
            lights[req.params.id].alert = stateReq.alert
            switch (stateReq.alert) {
                case 'select':
                    value.effect = 'okay'
                    break;
                case 'lselect':
                    value.effect = 'breathe'
                    break;
                default:
                    value.effect = 'stop_effect'
                    break;
            }
        }
        if (typeof stateReq.effect === 'string') {
            response.push({ "success": { [`/lights/${req.params.id}/state/effect`]: stateReq.effect } })
            lights[req.params.id].state.effect = stateReq.effect
            if (stateReq.effect === 'colorloop')
                value.effect = 'channel_change'
            else
                value.effect = 'stop_effect'
        }
        if (typeof stateReq.transitiontime === 'number') {
            response.push({ "success": { [`/lights/${req.params.id}/state/transitiontime`]: stateReq.transitiontime } })
            value.transition = stateReq.transitiontime
        }
        if (typeof stateReq.bri_inc === 'number') {
            response.push({ "success": { [`/lights/${req.params.id}/state/bri_inc`]: stateReq.bri_inc } })
            value.brightness_step = stateReq.bri_inc
        }
        if (typeof stateReq.sat_inc === 'number') {
            response.push({ "success": { [`/lights/${req.params.id}/state/sat_inc`]: stateReq.sat_inc } })
            value.saturation_step = stateReq.sat_inc
        }
        if (typeof stateReq.hue_inc === 'number') {
            response.push({ "success": { [`/lights/${req.params.id}/state/hue_inc`]: stateReq.hue_inc } })
            value.hue_step = stateReq.hue_inc
        }
        if (typeof stateReq.ct_inc === 'number') {
            response.push({ "success": { [`/lights/${req.params.id}/state/ct_inc`]: stateReq.ct_inc } })
            value.color_temp_step = stateReq.ct_inc
        }
        if (typeof stateReq.xy_inc === 'number') {
            response.push({ "success": { [`/lights/${req.params.id}/state/xy_inc`]: stateReq.ct_inc } })
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