const PDFDocument = require('pdfkit');


exports.createReport = (report) => {

    const pdf = new PDFDocument();
    //External Box
    drawLine(pdf, 40, 50, 560, 50, 1);
    drawLine(pdf, 40, 730, 560, 730, 1);
    drawLine(pdf, 560, 50, 560, 730, 1);
    drawLine(pdf, 40, 50, 40, 730, 1);

    drawHLine(pdf, 60, 1);
    drawLine(pdf, 190, 130, 550, 130, 1);
    drawHLine(pdf, 200, 1);

    drawLine(pdf, 50, 60, 50, 200, 1);
    drawLine(pdf, 550, 60, 550, 200, 1);
    drawLine(pdf, 190, 60, 190, 200, 1);
    drawLine(pdf, 370, 60, 370, 200, 1);

    pdf.image(__dirname + "/capoo.jpg", 55, 65, { width: 130, height: 130 })
    pdf.fontSize(15).text(`Dal Dairy Factory`, 220, 80);
    pdf.fontSize(16).text(`Date`, 390, 80);
    pdf.fontSize(15).text(`${report.date}`, 390, 110);

    pdf.fontSize(14).text(`Section`, 210, 150);
    pdf.fontSize(14).text(`Fresh Filling`, 240, 180);
    pdf.fontSize(14).text(`Report No: ${report.date}`, 390, 160);

    // Machine 
    pdf.fontSize(14).text(`Machine Name: ${report.machine}`, 70, 225);
    pdf.fontSize(14).text(`Product Name: ${report.product}`, 70, 250);
    pdf.fontSize(14).text(`Batch No.: ${report.batchNo}`, 70, 275);
    pdf.fontSize(14).text(`Batch Date: ${report.date}`, 70, 300);

    // Internal Box
    drawLine(pdf, 300, 353, 300, 652, 1);
    drawLine(pdf, 550, 330, 550, 652, 1);
    drawLine(pdf, 50, 330, 50, 652, 1);
    drawHLine(pdf, 330, 1);
    drawHLine(pdf, 353, 1);
    drawHLine(pdf, 376, 1);
    drawHLine(pdf, 399, 1);
    drawHLine(pdf, 422, 1);
    drawHLine(pdf, 445, 1);
    drawHLine(pdf, 468, 1);
    drawHLine(pdf, 491, 1);
    drawHLine(pdf, 514, 1);
    drawHLine(pdf, 537, 1);
    drawHLine(pdf, 560, 1);
    drawHLine(pdf, 583, 1);
    drawHLine(pdf, 606, 1);
    drawHLine(pdf, 629, 1);
    drawHLine(pdf, 652, 1);


    pdf.fontSize(14).text(`Batch Results`, 250, 335);
    pdf.fontSize(14).text(`Target`, 70, 358);
    pdf.fontSize(14).text(`${report.target}`, 320, 358);
    pdf.fontSize(14).text(`Actual`, 70, 381);
    pdf.fontSize(14).text(`${report.actual}`, 320, 381);
    //
    pdf.fontSize(14).text(`%Target-Actual`, 70, 404);
    pdf.fontSize(14).text(`${'100%'}`, 320, 404);
    pdf.fontSize(14).text(`Planned Production Time`, 70, 427);
    pdf.fontSize(14).text(`${report.ppt}`, 320, 427);
    pdf.fontSize(14).text(`Planned Stop Time`, 70, 450);
    pdf.fontSize(14).text(`${report.pst}`, 320, 450);
    //
    pdf.fontSize(14).text(`Run Time`, 70, 473);
    pdf.fontSize(14).text(`${report.runTime}`, 320, 473);
    pdf.fontSize(14).text(`Downtime`, 70, 496);
    pdf.fontSize(14).text(`${report.downTime}`, 320, 496);
    //
    pdf.fontSize(14).text(`Cycle Time`, 70, 519);
    pdf.fontSize(14).text(`${report.cycleTime}`, 320, 519);
    pdf.fontSize(14).text(`% Quality`, 70, 542);
    pdf.fontSize(14).text(`${report.quality}`, 320, 542);
    pdf.fontSize(14).text(`% Performance`, 70, 565);
    pdf.fontSize(14).text(`${report.performance}`, 320, 565);
    pdf.fontSize(14).text(`% Availability`, 70, 588);
    pdf.fontSize(14).text(`${report.availability}`, 320, 588);
    pdf.fontSize(14).text(`% OEE`, 70, 611);
    pdf.fontSize(14).text(`${report.oee}`, 320, 611);
    //
    pdf.fontSize(14).text(`Batch Total Time`, 70, 634);
    pdf.fontSize(14).text(`${report.totalTime}`, 320, 634);

    pdf.fontSize(14).text(`Name: ${report.supervisor}`, 50, 670);
    pdf.fontSize(14).text(`Signture: ........................`, 50, 700);
    // drawLine(pdf, 40, 730, 560, 730, 1);
    // drawLine(pdf, 560, 50, 560, 730, 1);
    // drawLine(pdf, 40, 50, 40, 730, 1);


    // pdf.fontSize(15).text(`Date :  ${report.date}`);
    // pdf.fontSize(16).text(`Batch No :  ${report.batchNo}`);
    // pdf.text(`Machine :  ${report.machine}`);
    // pdf.text(`Product :  ${report.product}`);
    // pdf.fontSize(15).text('---------------------------------------');
    // pdf.fontSize(15).text(`Target :  ${report.target}`);
    // pdf.fontSize(15).text(`Actual :  ${report.actual}`);
    // pdf.fontSize(15).text(`Mechanical Efficiecny :  ${report.meff}`);
    // pdf.fontSize(15).text(`Downtime :  ${report.downTime}`);
    // pdf.fontSize(15).text('---------------------------------------');
    // pdf.fontSize(15).text(`OEE :  ${report.oee}`);
    // pdf.fontSize(15).text(`Quality :  ${report.quality}`);
    // pdf.fontSize(15).text(`Availability :  ${report.availability}`);
    // pdf.fontSize(15).text(`Performance :  ${report.performance}`);
    // pdf.fontSize(15).text('---------------------------------------');
    // pdf.fontSize(15).text(`Supervisor :  ${report.supervisor}`);
    pdf.end();

    return pdf;
}

function drawHLine(doc, y, linWidth) {
    doc
        .strokeColor("#000000")
        .lineWidth(linWidth)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

function drawLine(doc, x1, y1, x2, y2, linWidth) {
    doc
        .strokeColor("#000000")
        .lineWidth(linWidth)
        .moveTo(x1, y1)
        .lineTo(x2, y2)
        .stroke();
}