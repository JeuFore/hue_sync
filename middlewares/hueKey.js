const fs = require('fs');

module.exports = (req, res, next) => {
    const authUsers = JSON.parse(fs.readFileSync(__dirname + '/../users/authUsers.json'));

    if (authUsers[req.headers['hue-application-key']])
        return next();
    res.status(403).send("")
}