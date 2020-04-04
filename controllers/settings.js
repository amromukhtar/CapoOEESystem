const Constants = require('../util/database/constants');

exports.getSettings = (req, res, next) => {
    res.render('settings', {
        isLoggedIn: req.session.isLoggedIn,
        authority: req.session.authority,
        username: req.session.user,
        downTime: global.downTime,
        cycleTime: global.cycleTime
    })
}

exports.postFactors = (req, res, next) => {
    const factors = req.body;
    global.downTime = factors.downTime;
    global.cycleTime = factors.cycleTime;
    res.json({ done: true })
    Constants.update({ type: 'MachineFactors' }, {
        downTime: factors.downTime,
        cycleTime: factors.cycleTime
    }, (result) => {
        // console.log(result)
    })
}


