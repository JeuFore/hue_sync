const fs = require('fs');

module.exports = (req, res, next) => {
    const authUsers = JSON.parse(fs.readFileSync(__dirname + '/../users/authUsers.json'));

    if (authUsers[req.params.username])
        return next();
    res.status(401).json({ type: 'error' })
}