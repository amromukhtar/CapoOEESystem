const batch = require('../app');

exports.liveView = (req, res, next) => {

    if (batch.batch1.running === true ||
        batch.batch2.running === true ||
        batch.batch3.running === true) {
        res.render('live-view', {
            runningBatches: JSON.stringify([batch.batch1.running, batch.batch2.running, batch.batch3.running])
        });
    } else {
        res.render('no-batch-view');
    }

}


