const batches = require('../util/database/database');
const PDFDocument = require('pdfkit');

exports.getReports = (req, res, next) => {
    // batches.find({ machine: 'Terpko A' })
    //     .then((result) => {
    //         console.log(result);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    res.render('reports');
}

exports.getMachineReports = (req, res, next) => {
    const machine = req.body.machine;
    batches.find({ machine: machine })
        .then((batches) => {
            res.status(200).send(JSON.stringify(batches));
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send(JSON.stringify());
        })
}

exports.downloadReport = (req, res, next) => {
    const report = req.body;
    const reportPDF = new PDFDocument();
    reportPDF.fontSize(16).text(`Capo OEE system report`);
    reportPDF.fontSize(15).text('---------------------------------------');
    reportPDF.fontSize(15).text(`Date :  ${report.date.date}`);
    reportPDF.fontSize(16).text(`Batch No :  ${report.batchNo}`);
    reportPDF.text(`Machine :  ${report.machine}`);
    reportPDF.text(`Product :  ${report.product}`);
    reportPDF.fontSize(15).text('---------------------------------------');
    reportPDF.fontSize(15).text(`Target :  ${report.target}`);
    reportPDF.fontSize(15).text(`Actual :  ${report.actual}`);
    reportPDF.fontSize(15).text(`Mechanical Efficiecny :  ${report.meff}`);
    reportPDF.fontSize(15).text(`Downtime :  ${report.downTime}`);
    reportPDF.fontSize(15).text('---------------------------------------');
    reportPDF.fontSize(15).text(`OEE :  ${report.oee}`);
    reportPDF.fontSize(15).text(`Quality :  ${report.quality}`);
    reportPDF.fontSize(15).text(`Availability :  ${report.availability}`);
    reportPDF.fontSize(15).text(`Performance :  ${report.performance}`);
    reportPDF.fontSize(15).text('---------------------------------------');
    reportPDF.fontSize(15).text(`Supervisor :  ${report.supervisor}`);
    reportPDF.end();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
        'Content-Disposition',
        'inline; filename="' + 'reportName' + '"'
    )
    reportPDF.pipe(res);
}
