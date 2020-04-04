const Constants = require('../util/database/constants');

exports.getFactors = () => {
    Constants.find({ type: 'MachineFactors' }).
        then((constant) => {
            global.downTime = constant[0].downTime;
            global.cycleTime = constant[0].cycleTime;
            // console.log(constant[0])
        })
        .catch((err) => {
            console.log(err)
        })
}