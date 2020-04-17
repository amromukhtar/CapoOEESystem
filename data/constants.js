const Constants = require('../util/database/constants');

exports.getFactors = () => {
    Constants.find({ type: 'MachineFactors' }).
        then((constant) => {
            if (constant.length != 0) {
                global.downTime = constant[0].downTime;
                global.idealCycleRate = constant[0].idealCycleRate;
            }
            else {
                global.downTime = [10, 10, 10, 10, 10, 10];
                global.idealCycleRate = {
                    Trepko_A: [180, 138, 138, 138, 138, 138, 138],
                    Trepko_B: [100, 72],
                    Trepko_C: [50, 50],
                    Erca_A: [300, 300, 360],
                    Erca_B: [300, 300, 300, 300, 360, 300],
                    NovaPak: [28],
                };
                const factors = new Constants({
                    type: 'MachineFactors',
                    downTime: global.downTime,
                    idealCycleRate: global.idealCycleRate
                })
                factors.save(() => {
                    console.log('Factors Has been Set');
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })

}

// global.icrTrepko_A = constant[0].icrTrepko_A;
//                 global.icrTrepko_B = constant[0].icrTrepko_B;
//                 global.icrTrepko_C = constant[0].icrTrepko_C;
//                 global.icrErca_A = constant[0].icrErca_A;
//                 global.icrErca_B = constant[0].icrErca_B;
//                 global.icrNovaPak = constant[0].icrNovaPak;