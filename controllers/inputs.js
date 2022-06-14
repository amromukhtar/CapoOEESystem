const batch = require('../app');

let id = {};

exports.setInputs = (req, res, next) => {
    res.render('inputs', {
        isLoggedIn: req.session.isLoggedIn,
        authority: req.session.authority,
        username: req.session.name,
        batch: JSON.stringify([
            batch.batch1,
            batch.batch2,
            batch.batch3,
            batch.batch4,
            // batch.batch5,
            // batch.batch6
        ])
    });
}


// API Handling
exports.postInputs = (req, res, next) => {

    const paramters = req.body;
    console.log(paramters)
    paramters.supervisor = req.session.name;
    if (paramters.status == 'starting') {

        if (paramters.machine == '0' && batch.batch1.status == 'FINISHED') {
            batch.batch1.setBatchValues(paramters, id.batch1);
            id.batch1 = batch.batch1.updateBatch();
        }
        else if (paramters.machine == '1' && batch.batch2.status == 'FINISHED') {
            batch.batch2.setBatchValues(paramters, id.batch2);
            id.batch2 = batch.batch2.updateBatch();
        }
        else if (paramters.machine == '2' && batch.batch3.status == 'FINISHED') {
            batch.batch3.setBatchValues(paramters, id.batch3);
            id.batch3 = batch.batch3.updateBatch();
        }
        else if (paramters.machine == '3' && batch.batch4.status == 'FINISHED') {
            batch.batch4.setBatchValues(paramters, id.batch4);
            id.batch4 = batch.batch4.updateBatch();
        }
        // else if (paramters.machine == '4' && batch.batch5.status == 'FINISHED') {
        //     batch.batch5.setBatchValues(paramters, id.batch5);
        //     id.batch5 = batch.batch5.updateBatch();
        // }
        // else if (paramters.machine == '5' && batch.batch6.status == 'FINISHED') {
        //     batch.batch6.setBatchValues(paramters, id.batch6);
        //     id.batch6 = batch.batch6.updateBatch();
        // }


    }

    else {

        if (paramters.machine == '0') {
            batch.batch1.endBatch();
        }
        else if (paramters.machine == '1') {
            batch.batch2.endBatch();
        }
        else if (paramters.machine == '2') {
            batch.batch3.endBatch();
        }
        else if (paramters.machine == '3') {
            batch.batch4.endBatch();
        }
        // else if (paramters.machine == '4') {
        //     batch.batch5.endBatch();
        // }
        // else if (paramters.machine == '5') {
        //     batch.batch6.endBatch();
        // }

    }

    res.send(JSON.stringify([
        batch.batch1,
        batch.batch2,
        batch.batch3,
        batch.batch4,
        // batch.batch5,
        // batch.batch6
    ]));
}

