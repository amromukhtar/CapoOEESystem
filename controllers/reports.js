const batches = require('../util/database/batch');
const docs = require('../util/pdfCreater');


exports.getReports = (req, res, next) => {
    res.render('reports', {
        isLoggedIn: req.session.isLoggedIn,
        authority: req.session.authority,
        username: req.session.name,
    });
}


// API Handling 
exports.getMachineReports = (req, res, next) => {
    const search = req.body;
    batches.find({
        machine: search.machine,
        date: { "$gte": search.fromDate, "$lte": search.toDate }
    })
        .then((batches) => {
            // const sortedBatches = batches.sort((a, b) => (a.fullDate.valueOf() < b.fullDate.valueOf()) ? 1 : -1);
            res.status(200).send(JSON.stringify(batches.reverse()));
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send(JSON.stringify());
        })
}

exports.downloadReport = (req, res, next) => {
    const report = req.body;
    const reportPDF = docs.createReport(report);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
        'Content-Disposition',
        'inline; filename="' + 'reportName' + '"'
    )
    reportPDF.pipe(res);
}
