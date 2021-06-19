module.exports = function Clip() {

    async function getBridge(req, res) {
        res.status(200).json({
            "data": [
                {
                    "bridge_id": "542696fffee02d09",
                    "id": "74465c96-d3c0-599a-b52f-91444eeef13d",
                    "id_v1": "",
                    "type": "bridge",
                    "lights": [
                        {
                            type: 'light',
                            id: 915005733701,
                            dimming: {
                                brightness: 10
                            }
                        }
                    ]
                }
            ],
            "errors": []
        })
    }

    async function getResource(req, res) {
        res.status(200).json({
            "errors": [],
            "data": [
                {
                    "id": "09c0749a-71ca-57f4-afea-35865da7378f",
                    "status": "unpaired",
                    "type": "homekit"
                },
                {
                    "id": "fdd7c1eb-00d2-585c-bdf4-054ca68ef0a8",
                    "type": "device",
                    "id_v1": "",
                    "metadata": {
                        "archetype": "bridge_v2",
                        "name": "Philips hue"
                    },
                    "product_data": {
                        "certified": true,
                        "manufacturer_name": "Signify Netherlands B.V.",
                        "model_id": "BSB002",
                        "product_archetype": "bridge_v2",
                        "product_name": "Philips hue",
                        "software_version": "1.45.1945091050"
                    },
                    "services": [
                        {
                            "rid": "74465c96-d3c0-599a-b52f-91444eeef13d",
                            "rtype": "bridge"
                        },
                        {
                            "rid": "93d2929a-969f-5cd5-9820-be9623d44658",
                            "rtype": "zigbee_connectivity"
                        },
                        {
                            "rid": "bff7bb45-0df6-5742-9e90-798207ceefe9",
                            "rtype": "entertainment"
                        }
                    ]
                },
                {
                    "bridge_id": "542696fffee02d09",
                    "id": "74465c96-d3c0-599a-b52f-91444eeef13d",
                    "id_v1": "",
                    "type": "bridge"
                },
                {
                    "id": "93d2929a-969f-5cd5-9820-be9623d44658",
                    "id_v1": "",
                    "status": "connected",
                    "type": "zigbee_connectivity"
                },
                {
                    "id": "57a9ebc9-406d-4a29-a4ff-42acee9e9be7",
                    "id_v1": "",
                    "proxy": true,
                    "renderer": false,
                    "type": "entertainment"
                },
                {
                    "id": "643c0dee-d81e-4ccb-b1b2-7d22f3528971",
                    "id_v1": "/groups/0",
                    "on": {
                        "on": false
                    },
                    "type": "grouped_light"
                },
                {
                    "grouped_services": [],
                    "id": "2f2d397f-dad9-58f5-ad0e-d6ac45d74a5b",
                    "id_v1": "/groups/0",
                    "services": [],
                    "type": "bridge_home"
                }
            ]
        })
    }

    async function getBehavior(req, res) {
        res.status(200).json({
            "data": [],
            "errors": [],
            "type": "ClipMessageBehaviorInstance"
        })
    }

    async function getGeofence(req, res) {
        res.status(200).json({
            "data": [],
            "errors": [],
            "type": "ClipMessageGeofenceClient"
        })
    }

    async function getGeolocation(req, res) {
        res.status(200).json({
            "data": [
                {
                    "id": "3a7952d2-c366-55a9-b985-936e2064adda",
                    "id_v1": "",
                    "is_configured": false,
                    "type": "geolocation"
                }
            ],
            "errors": [],
            "type": "ClipMessageGeolocation"
        })
    }

    async function getEventStream(req, res) {
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders(); // flush the headers to establish SSE with client

        res.write(`hi: \n\n`); // res.write() instead of res.send()
        // If client closes connection, stop sending events
        res.on('close', () => {
            console.log('client dropped me');
            res.end();
        });
    }

    return Object.freeze({
        getBridge,
        getResource,
        getBehavior,
        getGeofence,
        getGeolocation,
        getEventStream
    });
}