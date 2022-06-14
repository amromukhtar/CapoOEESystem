const Constants = require('../util/database/constants');

exports.getSettings = (req, res, next) => {
    res.render('settings', {
        isLoggedIn: req.session.isLoggedIn,
        authority: req.session.authority,
        username: req.session.name,
        downTime: global.downTime,
        icrSimply_8: global.idealCycleRate.Simply_8,
        icrTFA_A1_200: global.idealCycleRate.TFA_A1_200,
        icrTFA_A1_500: global.idealCycleRate.TFA_A1_500,
        icrTCA: global.idealCycleRate.TCA,
    })
}

exports.postFactors = (req, res, next) => {
    const factors = req.body;
    global.downTime = factors.downTime;
    global.idealCycleRate = factors.idealCycleRate;

    res.json({ done: true })
    Constants.update({ type: 'MachineFactors' }, {
        downTime: factors.downTime,
        idealCycleRate: factors.idealCycleRate
    }, (result) => { });
}


