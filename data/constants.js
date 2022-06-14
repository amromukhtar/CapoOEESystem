const Constants = require('../util/database/constants');
//4.0.8
exports.getFactors = async () => {
    try {
        const constant = await Constants.find({ type: 'MachineFactors' });
        if (constant.length == 0) {
            global.downTime = [10, 10, 10, 10];
            global.idealCycleRate = {
                Simply_8: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
                TFA_A1_200: [233.3, 233.3, 233.3, 233.3],
                TFA_A1_500: [163, 163, 163, 163],
                TCA: [241.6, 241.6, 241.6, 241.6, 241.6, 241.6],
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

        global.downTime = constant[0].downTime;
        global.idealCycleRate = constant[0].idealCycleRate;
    }
    catch(err){
        console.log(err)
    }

}

// global.icrTrepko_A = constant[0].icrTrepko_A;
//                 global.icrTrepko_B = constant[0].icrTrepko_B;
//                 global.icrTrepko_C = constant[0].icrTrepko_C;
//                 global.icrErca_A = constant[0].icrErca_A;
//                 global.icrErca_B = constant[0].icrErca_B;
//                 global.icrNovaPak = constant[0].icrNovaPak;