const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
// const port = new SerialPort('COM11');
const port = new SerialPort('/dev/ttyACM0');
const parser = port.pipe(new Readline({ delimiter: '\n' }));

const batch = require('../app');

exports.handleSensorsData = () => {
    parser.on('data', (data) => {
        if (data == 0 && batch.batch1.status == 'RUNNING') {
            batch.batch1.getSensorsData();
        }
        else if (data == 1 && batch.batch2.status == 'RUNNING') {
            batch.batch2.getSensorsData();
        }
        else if (data == 2 && batch.batch3.status == 'RUNNING') {
            batch.batch3.getSensorsData();
        }
        else if (data == 3 && batch.batch4.status == 'RUNNING') {
            batch.batch4.getSensorsData();
        }
        else if (data == 4 && batch.batch5.status == 'RUNNING') {
            batch.batch5.getSensorsData();
        }
        else if (data == 5 && batch.batch6.status == 'RUNNING') {
            batch.batch6.getSensorsData();
        }

    })
}