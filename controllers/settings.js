const Constants = require('../util/database/constants');

exports.getSettings = (req, res, next) => {
    res.render('settings', {
        isLoggedIn: req.session.isLoggedIn,
        authority: req.session.authority,
        username: req.session.name,
        downTime: global.downTime,
        icrTrepko_A: global.idealCycleRate.Trepko_A,
        icrTrepko_B: global.idealCycleRate.Trepko_B,
        icrTrepko_C: global.idealCycleRate.Trepko_C,
        icrErca_A: global.idealCycleRate.Erca_A,
        icrErca_B: global.idealCycleRate.Erca_B,
        icrNovaPak: global.idealCycleRate.NovaPak,
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


