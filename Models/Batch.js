const io = require('../app');

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM11');
const parser = port.pipe(new Readline({ delimiter: '\n' }));

const BatchDB = require('../util/database/batch');

const machine = ['Terpko A', 'Terpko B', 'Terpko C', 'Erca A', 'Erca B', 'NovaPak'];
const product = ['Set', 'Natural', 'Delights Custard', 'Delights Chocolate', 'Hilba Madida', 'Millet Madida', 'Date & Millet Madida'];
const batchName = ['batch1', 'batch2', 'batch3', 'batch4', 'batch5', 'batch6'];

module.exports = class Batch {
    constructor() {
        this.running = false;
        this.status = 'FINISHED';
        this.startBatchId = null;
    }

    setBatchValues(parameters, id) {
        this.supervisor = parameters.supervisor;
        this.batchNo = parameters.batchNo;
        this.batchName = batchName[parameters.machine];
        this.machineNo = parameters.machine;
        this.machine = machine[parameters.machine];
        this.productNo = parameters.product
        this.product = product[parameters.product];
        this.target = parameters.target;
        this.actualCount = 0;
        this.ppt = parameters.ppt;
        this.pst = parameters.pst;
        this.date = parameters.date;
        this.tempDownTime = 0;
        this.actualDownTime = 10;
        this.perDefinedDownTime = global.downTime[parameters.machine];
        this.cycleTime = global.cycleTime[parameters.machine]
        this.startingTime = new Date().getTime();
        this.status = 'RUNNING';
        this.liveStatus = 'RUNNING';
        this.running = true;

        this.getSensorsData();
        // close Previous Timers
        try {
            clearInterval(id)
        } catch (err) {
            console.log(err)
        }
    }

    updateBatch = () => {
        const id = setInterval(() => {
            if (this.status === 'RUNNING') {
                this.updateActualDownTime();
                io.sendData(this.batchName, {
                    batchNo: this.batchNo,
                    machine: this.machine,
                    machineNo: this.machineNo,
                    product: this.product,
                    date: this.date,
                    target: this.target,
                    actual: this.actualCount,
                    mEff: this.getMeff(),
                    downTime: this.getDownTime(),
                    running: this.running,
                    status: this.status,
                    liveStatus: this.liveStatus,
                });
            }
            else if (this.status === 'FINISHED') {
                io.sendData(this.batchName, {
                    batchNo: this.batchNo,
                    machine: this.machine,
                    machineNo: this.machineNo,
                    product: this.product,
                    date: this.date,
                    oee: this.oee,
                    quality: this.quality,
                    availability: this.availability,
                    performance: this.performance,
                    running: this.running,
                    status: this.status,
                    liveStatus: this.liveStatus,
                });
            }
        }, 1000);
        // console.log(CircularJSON.stringify(id))
        // const this.startBatchId = id;
        return id;
    }

    getSensorsData = () => {
        parser.on('data', (data) => {
            if (Number(this.machineNo) == data) {
                this.actualCount++;
                this.tempDownTime = 0;
            }
        })
    }

    endBatch = () => {
        // Getting last batch parameters
        this.endingTime = new Date().getTime();
        this.calculateResults();
        this.liveStatus = "FINISHED";

        // Saving Batch in DB
        this.addBatch();

        // Clearing Batch parameters
        this.tempDownTime = 0;
        this.actualDownTime = 0;
        this.actualCount = 0;
        this.status = 'FINISHED';
        this.running = true;
    }


    // CALCULATIONS
    getMeff = () => {
        return '90 %';
    }

    calculateResults = () => {
        this.actualDownTimeMin = String(Math.floor(this.actualDownTime / 60) + ' min');
        this.runTime = String(Number(this.ppt) - Number(this.pst) + ' min');
        this.totalTime = String(Number(this.ppt) + Number(this.pst) + ' min');
        this.pptString = this.ppt + ' min';
        this.pstString = this.pst + ' min';
        this.cycleTimeString = this.cycleTime + ' Cycles/min'
        this.quality = "100 %";
        this.availability = "90 %";
        this.performance = "89 %";
        this.oee = "90 %";

    }
    // UTILS

    addBatch = () => {
        const batch = new BatchDB({
            date: this.date,
            startTime: this.startTime,
            endTime: this.endTime,
            batchNo: this.batchNo,
            machine: this.machine,
            product: this.product,
            target: this.target,
            actual: this.actualCount,
            ppt: this.pptString,
            pst: this.pstString,
            runTime: this.runTime,
            totalTime: this.totalTime,
            meff: this.getMeff(),
            downTime: this.actualDownTimeMin,
            cycleTime: this.cycleTimeString,
            oee: this.oee,
            quality: this.quality,
            availability: this.availability,
            performance: this.performance,
            supervisor: this.supervisor,
        })
        batch.save()
            .then((result) => {
                console.log('Batch Added Successfully');
            })
            .catch((err) => {
                console.log(err)
            })
    }
    updateActualDownTime = () => {
        this.tempDownTime++;
        // this.actualCount++;

        this.liveStatus = "RUNNING";
        if (this.tempDownTime > this.perDefinedDownTime) {
            this.actualDownTime++;
            this.liveStatus = "STOPED";
        }
    }

    getDownTime = () => {
        return new Date(this.actualDownTime * 1000).toISOString().substr(11, 8);
    }



}





