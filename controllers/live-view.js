const batch = require('../app');

exports.liveView = (req, res, next) => {

    if (batch.batch1.running === true ||
        batch.batch2.running === true ||
        batch.batch3.running === true ||
        batch.batch4.running === true ||
        batch.batch5.running === true ||
        batch.batch6.running === true) {
        res.render('live-view', {
            runningBatches: JSON.stringify([
                batch.batch1.running,
                batch.batch2.running,
                batch.batch3.running,
                batch.batch4.running,
                batch.batch5.running,
                batch.batch6.running])
        });
    } else {
        res.render('no-batch-view');
    }

}


