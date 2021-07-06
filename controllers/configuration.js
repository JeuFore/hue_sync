const { v4 } = require('uuid');
const fs = require('fs');

const lights = require('../config/lights')
const groups = require('../config/groups')

module.exports = function Configuration() {
    async function createUser(req, res) {
        const { devicetype, generateclientkey } = req.body

        if (!devicetype)
            return res.status(400).json({ type: 'error' })

        const username = v4();

        const clientkey = generateclientkey ? v4() : undefined

        let authUsers = JSON.parse(fs.readFileSync(__dirname + '/../users/authUsers.json'));

        const user = Object.entries(authUsers).find(value => value[1].name === devicetype)
        if (user)
            delete authUsers[user[0]]

        authUsers[username] = { name: devicetype }

        fs.writeFileSync(__dirname + '/../users/authUsers.json', JSON.stringify(authUsers))

        res.status(200).send([{
            "success": { username, clientkey }
        }])
    }

    async function getUserConfig(req, res) {
        let date = new Date()
        date.setHours(date.getHours() + 2)

        res.status(200).json({
            "name": "Philips hue",
            "zigbeechannel": 15,
            "mac": "00:17:88:00:00:00",
            "dhcp": true,
            "ipaddress": "192.168.1.10",
            "netmask": "255.255.255.0",
            "gateway": "192.168.1.1",
            "proxyaddress": "none",
            "proxyport": 0,
            "UTC": new Date().toISOString(),
            "localtime": date.toISOString(),
            "timezone": "Europe/Paris",
            "whitelist": JSON.parse(fs.readFileSync(__dirname + '/../users/authUsers.json')),
            "swversion": "1945091050",
            "apiversion": "1.44.0",
            "swupdate": {
                "updatestate": 0,
                "url": "",
                "text": "",
                "notify": false
            },
            "linkbutton": false,
            "portalservices": false,
            "portalconnection": "connected",
            "portalstate": {
                "signedon": true,
                "incoming": false,
                "outgoing": true,
                "communication": "disconnected"
            }
        })
    }

    async function modifyConfig(req, res) {
        const { name } = req.body

        let authUsers = JSON.parse(fs.readFileSync(__dirname + '/../users/authUsers.json'));

        if (name) {
            if (!authUsers[req.params.username])
                return res.status(400).json({ type: 'error' })

            authUsers[req.params.username] = { name }

            fs.writeFileSync(__dirname + '/../users/authUsers.json', JSON.stringify(authUsers))
            return res.status(200).send([{ success: { "/config/name": authUsers[req.params.username].name } }])
        }

        return res.status(200).send("")
    }

    async function getDataStore(req, res) {
        let date = new Date()
        date.setHours(date.getHours() + 2)

        return res.status(200).json({
            "config": {
                "backup": {
                    "errorcode": 0,
                    "status": "idle"
                },
                "datastoreversion": "103",
                "dhcp": true,
                "factorynew": false,
                "internetservices": {
                    "internet": "disconnected",
                    "remoteaccess": "disconnected",
                    "swupdate": "disconnected",
                    "time": "disconnected"
                },
                "linkbutton": false,
                "modelid": "BSB002",
                "portalconnection": "disconnected",
                "portalservices": false,
                "portalstate": {
                    "communication": "disconnected",
                    "incoming": false,
                    "outgoing": false,
                    "signedon": false
                },
                "proxyaddress": "none",
                "proxyport": 0,
                "replacesbridgeid": null,
                "swupdate": {
                    "checkforupdate": false,
                    "devicetypes": {
                        "bridge": false,
                        "lights": [

                        ],
                        "sensors": [

                        ]
                    },
                    "notify": true,
                    "text": "",
                    "updatestate": 0,
                    "url": ""
                },
                "swupdate2": {
                    "autoinstall": {
                        "on": true,
                        "updatetime": "T14:00:00"
                    },
                    "bridge": {
                        "lastinstall": "2020-12-11T17:08:55",
                        "state": "noupdates"
                    },
                    "checkforupdate": false,
                    "lastchange": "2020-12-13T10:30:15",
                    "state": "unknown"
                },
                "zigbeechannel": 25,
                "apiversion": "1.44.0",
                "bridgeid": "542696FFFEE02D09",
                "ipaddress": "192.168.1.10",
                "netmask": "255.255.255.0",
                "gateway": "192.168.1.1",
                "mac": "00:17:88:00:00:00",
                "name": " Philips hue",
                "swversion": "1945091050",
                "timezone": "Europe/Paris",
                "UTC": new Date().toISOString(),
                "localtime": date.toISOString(),
                "whitelist": JSON.parse(fs.readFileSync(__dirname + '/../users/authUsers.json')),
            },
            "lights": lights,
            "groups": groups,
            "scenes": {

            },
            "rules": {

            },
            "resourcelinks": {

            },
            "schedules": {

            },
            "sensors": {
            }
        })
    }

    async function getConfig(req, res) {
        let date = new Date()
        date.setHours(date.getHours() + 2)

        return res.status(200).json({
            "zigbeechannel": 25,
            "Remote API enabled": false,
            "apiversion": "1.44.0",
            "bridgeid": "542696FFFEE02D09",
            "ipaddress": "192.168.1.10",
            "netmask": "255.255.255.0",
            "gateway": "192.168.1.1",
            "mac": "00:17:88:00:00:00",
            "name": " Philips hue",
            "swversion": "1945091050",
            "timezone": "Europe/Paris",
            "UTC": new Date().toISOString(),
            "localtime": date.toISOString()
        })
    }

    async function getCapabilities(req, res) {
        res.status(200).json({
            "lights": {
                "available": 60,
                "total": 63
            },
            "sensors": {
                "available": 240,
                "total": 250,
                "clip": {
                    "available": 240,
                    "total": 250
                },
                "zll": {
                    "available": 63,
                    "total": 64
                },
                "zgp": {
                    "available": 63,
                    "total": 64
                }
            },
            "groups": {
                "available": 60,
                "total": 64
            },
            "scenes": {
                "available": 172,
                "total": 200,
                "lightstates": {
                    "available": 10836,
                    "total": 12600
                }
            },
            "schedules": {
                "available": 95,
                "total": 100
            },
            "rules": {
                "available": 233,
                "total": 250,
                "conditions": {
                    "available": 1451,
                    "total": 1500
                },
                "actions": {
                    "available": 964,
                    "total": 1000
                }
            },
            "resourcelinks": {
                "available": 59,
                "total": 64
            },
            "streaming": {
                "available": 1,
                "total": 1,
                "channels": 20
            },
            "timezones": {
                "values": [
                    "CET",
                    "CST6CDT",
                    "EET",
                    "EST",
                    "EST5EDT",
                    "HST",
                    "MET",
                    "MST",
                    "MST7MDT",
                    "PST8PDT",
                    "WET",
                    "Africa/Abidjan",
                    "Africa/Accra",
                    "Africa/Addis_Ababa",
                    "Africa/Algiers",
                    "Africa/Asmara",
                    "Africa/Bamako",
                    "Africa/Bangui",
                    "Africa/Banjul",
                    "Africa/Bissau",
                    "Africa/Blantyre",
                    "Africa/Brazzaville",
                    "Africa/Bujumbura",
                    "Africa/Cairo",
                    "Africa/Casablanca",
                    "Africa/Ceuta",
                    "Africa/Conakry",
                    "Africa/Dakar",
                    "Africa/Dar_es_Salaam",
                    "Africa/Djibouti",
                    "Africa/Douala",
                    "Africa/El_Aaiun",
                    "Africa/Freetown",
                    "Africa/Gaborone",
                    "Africa/Harare",
                    "Africa/Johannesburg",
                    "Africa/Juba",
                    "Africa/Kampala",
                    "Africa/Khartoum",
                    "Africa/Kigali",
                    "Africa/Kinshasa",
                    "Africa/Lagos",
                    "Africa/Libreville",
                    "Africa/Lome",
                    "Africa/Luanda",
                    "Africa/Lubumbashi",
                    "Africa/Lusaka",
                    "Africa/Malabo",
                    "Africa/Maputo",
                    "Africa/Maseru",
                    "Africa/Mbabane",
                    "Africa/Mogadishu",
                    "Africa/Monrovia",
                    "Africa/Nairobi",
                    "Africa/Ndjamena",
                    "Africa/Niamey",
                    "Africa/Nouakchott",
                    "Africa/Ouagadougou",
                    "Africa/Porto-Novo",
                    "Africa/Sao_Tome",
                    "Africa/Tripoli",
                    "Africa/Tunis",
                    "Africa/Windhoek",
                    "America/Adak",
                    "America/Anchorage",
                    "America/Anguilla",
                    "America/Antigua",
                    "America/Araguaina",
                    "America/Aruba",
                    "America/Asuncion",
                    "America/Atikokan",
                    "America/Bahia",
                    "America/Bahia_Banderas",
                    "America/Barbados",
                    "America/Belem",
                    "America/Belize",
                    "America/Blanc-Sablon",
                    "America/Boa_Vista",
                    "America/Bogota",
                    "America/Boise",
                    "America/Cambridge_Bay",
                    "America/Campo_Grande",
                    "America/Cancun",
                    "America/Caracas",
                    "America/Cayenne",
                    "America/Cayman",
                    "America/Chicago",
                    "America/Chihuahua",
                    "America/Costa_Rica",
                    "America/Creston",
                    "America/Cuiaba",
                    "America/Curacao",
                    "America/Danmarkshavn",
                    "America/Dawson",
                    "America/Dawson_Creek",
                    "America/Denver",
                    "America/Detroit",
                    "America/Dominica",
                    "America/Edmonton",
                    "America/Eirunepe",
                    "America/El_Salvador",
                    "America/Fort_Nelson",
                    "America/Fortaleza",
                    "America/Glace_Bay",
                    "America/Goose_Bay",
                    "America/Grand_Turk",
                    "America/Grenada",
                    "America/Guadeloupe",
                    "America/Guatemala",
                    "America/Guayaquil",
                    "America/Guyana",
                    "America/Halifax",
                    "America/Havana",
                    "America/Hermosillo",
                    "America/Inuvik",
                    "America/Iqaluit",
                    "America/Jamaica",
                    "America/Juneau",
                    "America/Kralendijk",
                    "America/La_Paz",
                    "America/Lima",
                    "America/Los_Angeles",
                    "America/Lower_Princes",
                    "America/Maceio",
                    "America/Managua",
                    "America/Manaus",
                    "America/Marigot",
                    "America/Martinique",
                    "America/Matamoros",
                    "America/Mazatlan",
                    "America/Menominee",
                    "America/Merida",
                    "America/Metlakatla",
                    "America/Mexico_City",
                    "America/Miquelon",
                    "America/Moncton",
                    "America/Monterrey",
                    "America/Montevideo",
                    "America/Montserrat",
                    "America/Nassau",
                    "America/New_York",
                    "America/Nipigon",
                    "America/Nome",
                    "America/Noronha",
                    "America/Nuuk",
                    "America/Ojinaga",
                    "America/Panama",
                    "America/Pangnirtung",
                    "America/Paramaribo",
                    "America/Phoenix",
                    "America/Port-au-Prince",
                    "America/Port_of_Spain",
                    "America/Porto_Velho",
                    "America/Puerto_Rico",
                    "America/Punta_Arenas",
                    "America/Rainy_River",
                    "America/Rankin_Inlet",
                    "America/Recife",
                    "America/Regina",
                    "America/Resolute",
                    "America/Rio_Branco",
                    "America/Santarem",
                    "America/Santiago",
                    "America/Santo_Domingo",
                    "America/Sao_Paulo",
                    "America/Scoresbysund",
                    "America/Sitka",
                    "America/St_Barthelemy",
                    "America/St_Johns",
                    "America/St_Kitts",
                    "America/St_Lucia",
                    "America/St_Thomas",
                    "America/St_Vincent",
                    "America/Swift_Current",
                    "America/Tegucigalpa",
                    "America/Thule",
                    "America/Thunder_Bay",
                    "America/Tijuana",
                    "America/Toronto",
                    "America/Tortola",
                    "America/Vancouver",
                    "America/Whitehorse",
                    "America/Winnipeg",
                    "America/Yakutat",
                    "America/Yellowknife",
                    "America/Argentina/Buenos_Aires",
                    "America/Argentina/Catamarca",
                    "America/Argentina/Cordoba",
                    "America/Argentina/Jujuy",
                    "America/Argentina/La_Rioja",
                    "America/Argentina/Mendoza",
                    "America/Argentina/Rio_Gallegos",
                    "America/Argentina/Salta",
                    "America/Argentina/San_Juan",
                    "America/Argentina/San_Luis",
                    "America/Argentina/Tucuman",
                    "America/Argentina/Ushuaia",
                    "America/Indiana/Indianapolis",
                    "America/Indiana/Knox",
                    "America/Indiana/Marengo",
                    "America/Indiana/Petersburg",
                    "America/Indiana/Tell_City",
                    "America/Indiana/Vevay",
                    "America/Indiana/Vincennes",
                    "America/Indiana/Winamac",
                    "America/Kentucky/Louisville",
                    "America/Kentucky/Monticello",
                    "America/North_Dakota/Beulah",
                    "America/North_Dakota/Center",
                    "America/North_Dakota/New_Salem",
                    "Antarctica/Casey",
                    "Antarctica/Davis",
                    "Antarctica/DumontDUrville",
                    "Antarctica/Macquarie",
                    "Antarctica/Mawson",
                    "Antarctica/McMurdo",
                    "Antarctica/Palmer",
                    "Antarctica/Rothera",
                    "Antarctica/Syowa",
                    "Antarctica/Troll",
                    "Antarctica/Vostok",
                    "Arctic/Longyearbyen",
                    "Asia/Aden",
                    "Asia/Almaty",
                    "Asia/Amman",
                    "Asia/Anadyr",
                    "Asia/Aqtau",
                    "Asia/Aqtobe",
                    "Asia/Ashgabat",
                    "Asia/Atyrau",
                    "Asia/Baghdad",
                    "Asia/Bahrain",
                    "Asia/Baku",
                    "Asia/Bangkok",
                    "Asia/Barnaul",
                    "Asia/Beirut",
                    "Asia/Bishkek",
                    "Asia/Brunei",
                    "Asia/Chita",
                    "Asia/Choibalsan",
                    "Asia/Colombo",
                    "Asia/Damascus",
                    "Asia/Dhaka",
                    "Asia/Dili",
                    "Asia/Dubai",
                    "Asia/Dushanbe",
                    "Asia/Famagusta",
                    "Asia/Gaza",
                    "Asia/Hebron",
                    "Asia/Ho_Chi_Minh",
                    "Asia/Hong_Kong",
                    "Asia/Hovd",
                    "Asia/Irkutsk",
                    "Asia/Istanbul",
                    "Asia/Jakarta",
                    "Asia/Jayapura",
                    "Asia/Jerusalem",
                    "Asia/Kabul",
                    "Asia/Kamchatka",
                    "Asia/Karachi",
                    "Asia/Kathmandu",
                    "Asia/Khandyga",
                    "Asia/Kolkata",
                    "Asia/Krasnoyarsk",
                    "Asia/Kuala_Lumpur",
                    "Asia/Kuching",
                    "Asia/Kuwait",
                    "Asia/Macau",
                    "Asia/Magadan",
                    "Asia/Makassar",
                    "Asia/Manila",
                    "Asia/Muscat",
                    "Asia/Nicosia",
                    "Asia/Novokuznetsk",
                    "Asia/Novosibirsk",
                    "Asia/Omsk",
                    "Asia/Oral",
                    "Asia/Phnom_Penh",
                    "Asia/Pontianak",
                    "Asia/Pyongyang",
                    "Asia/Qatar",
                    "Asia/Qostanay",
                    "Asia/Qyzylorda",
                    "Asia/Riyadh",
                    "Asia/Sakhalin",
                    "Asia/Samarkand",
                    "Asia/Seoul",
                    "Asia/Shanghai",
                    "Asia/Singapore",
                    "Asia/Srednekolymsk",
                    "Asia/Taipei",
                    "Asia/Tashkent",
                    "Asia/Tbilisi",
                    "Asia/Tehran",
                    "Asia/Thimphu",
                    "Asia/Tokyo",
                    "Asia/Tomsk",
                    "Asia/Ulaanbaatar",
                    "Asia/Urumqi",
                    "Asia/Ust-Nera",
                    "Asia/Vientiane",
                    "Asia/Vladivostok",
                    "Asia/Yakutsk",
                    "Asia/Yangon",
                    "Asia/Yekaterinburg",
                    "Asia/Yerevan",
                    "Atlantic/Azores",
                    "Atlantic/Bermuda",
                    "Atlantic/Canary",
                    "Atlantic/Cape_Verde",
                    "Atlantic/Faroe",
                    "Atlantic/Madeira",
                    "Atlantic/Reykjavik",
                    "Atlantic/South_Georgia",
                    "Atlantic/St_Helena",
                    "Atlantic/Stanley",
                    "Australia/Adelaide",
                    "Australia/Brisbane",
                    "Australia/Broken_Hill",
                    "Australia/Currie",
                    "Australia/Darwin",
                    "Australia/Eucla",
                    "Australia/Hobart",
                    "Australia/Lindeman",
                    "Australia/Lord_Howe",
                    "Australia/Melbourne",
                    "Australia/Perth",
                    "Australia/Sydney",
                    "Europe/Amsterdam",
                    "Europe/Andorra",
                    "Europe/Astrakhan",
                    "Europe/Athens",
                    "Europe/Belgrade",
                    "Europe/Berlin",
                    "Europe/Bratislava",
                    "Europe/Brussels",
                    "Europe/Bucharest",
                    "Europe/Budapest",
                    "Europe/Busingen",
                    "Europe/Chisinau",
                    "Europe/Copenhagen",
                    "Europe/Dublin",
                    "Europe/Gibraltar",
                    "Europe/Guernsey",
                    "Europe/Helsinki",
                    "Europe/Isle_of_Man",
                    "Europe/Istanbul",
                    "Europe/Jersey",
                    "Europe/Kaliningrad",
                    "Europe/Kiev",
                    "Europe/Kirov",
                    "Europe/Lisbon",
                    "Europe/Ljubljana",
                    "Europe/London",
                    "Europe/Luxembourg",
                    "Europe/Madrid",
                    "Europe/Malta",
                    "Europe/Mariehamn",
                    "Europe/Minsk",
                    "Europe/Monaco",
                    "Europe/Moscow",
                    "Europe/Nicosia",
                    "Europe/Oslo",
                    "Europe/Paris",
                    "Europe/Podgorica",
                    "Europe/Prague",
                    "Europe/Riga",
                    "Europe/Rome",
                    "Europe/Samara",
                    "Europe/San_Marino",
                    "Europe/Sarajevo",
                    "Europe/Saratov",
                    "Europe/Simferopol",
                    "Europe/Skopje",
                    "Europe/Sofia",
                    "Europe/Stockholm",
                    "Europe/Tallinn",
                    "Europe/Tirane",
                    "Europe/Ulyanovsk",
                    "Europe/Uzhgorod",
                    "Europe/Vaduz",
                    "Europe/Vatican",
                    "Europe/Vienna",
                    "Europe/Vilnius",
                    "Europe/Volgograd",
                    "Europe/Warsaw",
                    "Europe/Zagreb",
                    "Europe/Zaporozhye",
                    "Europe/Zurich",
                    "Indian/Antananarivo",
                    "Indian/Chagos",
                    "Indian/Christmas",
                    "Indian/Cocos",
                    "Indian/Comoro",
                    "Indian/Kerguelen",
                    "Indian/Mahe",
                    "Indian/Maldives",
                    "Indian/Mauritius",
                    "Indian/Mayotte",
                    "Indian/Reunion",
                    "Pacific/Apia",
                    "Pacific/Auckland",
                    "Pacific/Bougainville",
                    "Pacific/Chatham",
                    "Pacific/Chuuk",
                    "Pacific/Easter",
                    "Pacific/Efate",
                    "Pacific/Enderbury",
                    "Pacific/Fakaofo",
                    "Pacific/Fiji",
                    "Pacific/Funafuti",
                    "Pacific/Galapagos",
                    "Pacific/Gambier",
                    "Pacific/Guadalcanal",
                    "Pacific/Guam",
                    "Pacific/Honolulu",
                    "Pacific/Kiritimati",
                    "Pacific/Kosrae",
                    "Pacific/Kwajalein",
                    "Pacific/Majuro",
                    "Pacific/Marquesas",
                    "Pacific/Midway",
                    "Pacific/Nauru",
                    "Pacific/Niue",
                    "Pacific/Norfolk",
                    "Pacific/Noumea",
                    "Pacific/Pago_Pago",
                    "Pacific/Palau",
                    "Pacific/Pitcairn",
                    "Pacific/Pohnpei",
                    "Pacific/Port_Moresby",
                    "Pacific/Rarotonga",
                    "Pacific/Saipan",
                    "Pacific/Tahiti",
                    "Pacific/Tarawa",
                    "Pacific/Tongatapu",
                    "Pacific/Wake",
                    "Pacific/Wallis"
                ]
            }
        })
    }

    return Object.freeze({
        createUser,
        getConfig,
        getUserConfig,
        modifyConfig,
        getDataStore,
        getCapabilities
    });
}