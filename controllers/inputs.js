const url = require('url');

const batch = require('../app');
let id = {};

exports.setInputs = (req, res, next) => {
    if (req.session.isLogged == true) {
        res.render('inputs', {
            batch: JSON.stringify([batch.batch1, batch.batch2, batch.batch3])
        });
    }
    else {
        res.render('login');
    }
}

exports.postInputs = (req, res, next) => {

    const paramters = req.body;
    // console.log(req.body);

    if (paramters.status == 'starting') {

        if (paramters.machine == '0' && batch.batch1.status == 'FINISHED') {
            batch.batch1.setBatchValues(paramters, id.batch1);
            id.batch1 = batch.batch1.startBatch();
        }
        else if (paramters.machine == '1' && batch.batch2.status == 'FINISHED') {
            batch.batch2.setBatchValues(paramters, id.batch2);
            id.batch2 = batch.batch2.startBatch();
        }
        else if (paramters.machine == '2' && batch.batch3.status == 'FINISHED') {
            batch.batch3.setBatchValues(paramters, id.batch3);
            id.batch3 = batch.batch3.startBatch();
        }

    }
    else {
        if (paramters.machine == '0') {
            batch.batch1.endBatch(id.batch1);
        }
        else if (paramters.machine == '1') {
            batch.batch2.endBatch(id.batch2);
        }
        else if (paramters.machine == '2') {
            batch.batch3.endBatch(id.batch3);
        }
    }

    return res.end(JSON.stringify([batch.batch1, batch.batch2, batch.batch3]));

}


// res.redirect(url.format({
    //     pathname: "/set-inputs",
    //     query: {
    //         "runningBatches": runningBatches,
    //     }
    // }));
