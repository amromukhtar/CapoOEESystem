const Constants = require('../util/database/constants');

exports.getFactors = () => {
    Constants.find({ type: 'Machine' }).
        then((constant) => {
            if (constant.length != 0) {
                global.downTime = constant[0].downTime;
                global.cycleTime = constant[0].cycleTime;
            }
            else {
                global.downTime = [10, 10, 10, 10, 10, 10];
                global.cycleTime = [10, 10, 10, 10, 10, 10];
            }
        })
        .catch((err) => {
            console.log(err)
        })
}