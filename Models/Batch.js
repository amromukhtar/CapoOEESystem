const io = require('../app');
const BatchDB = require('../util/database/database');


const machine = ['Terpko A', 'Terpko B', 'Terpko C'];
const batchName = ['batch1', 'batch2', 'batch3'];

module.exports = class Batch {
    constructor() {
        this.running = false;
        this.status = 'FINISHED';
        this.startBatchId = null;
    }

    setBatchValues(parameters, id) {
        this.batchNo = parameters.batchNo;
        this.batchName = batchName[parameters.machine];
        this.machineNo = parameters.machine;
        this.machine = machine[parameters.machine];
        this.product = parameters.product;
        this.target = parameters.target;
        this.actualCount = 0;
        this.ppt = parameters.ppt;
        this.pst = parameters.pst;
        this.date = parameters.date;
        this.tempDownTime = 0;
        this.actualDownTime = 10;
        this.perDefinedDownTime = 10;
        this.startingTime = new Date().getTime();
        this.status = 'RUNNING';
        this.running = true;

        // close Previous Timers
        try {
            // console.log(this.machine,' CLEARED ',id)
            clearInterval(id)
        } catch (err) {
            console.log(err)
        }
    }

    startBatch = () => {
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
                });
            }
            else if (this.status === 'FINISHED') {
                io.sendData(this.batchName, {
                    batchNo: this.batchNo,
                    machine: this.machine,
                    machineNo: this.machineNo,
                    product: this.product,
                    date: this.date,
                    quality: '100%',
                    performance: '89%',
                    availablity: '93%',
                    oee: '80%',
                    running: this.running,
                    status: this.status,
                });
            }
        }, 1000);
        // console.log(CircularJSON.stringify(id))
        // const this.startBatchId = id;
        return id;
    }

    endBatch = () => {
        // Getting last batch parameters
        this.endingTime = new Date().getTime();

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
    // UTILS

    addBatch = () => {
        const batch = new BatchDB({
            date: { date: this.date, startTime: this.startTime, endTime: this.endTime },
            batchNo: this.batchNo,
            machine: this.machine,
            product: this.product,
            target: this.target,
            actual: this.actualCount,
            ppt: this.ppt,
            pst: this.pst,
            meff: this.getMeff(),
            downTime: this.actualDownTime,
            oee: '90%',
            quality: '83%',
            availability: '88%',
            performance: '70%',
            supervisor:'Ahmed Omer'
        })
        batch.save()
            .then((result) => {
                console.log(result)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    updateActualDownTime = () => {
        this.tempDownTime++;
        if (this.tempDownTime > this.perDefinedDownTime) {
            this.actualDownTime++;
        }
    }

    getDownTime = () => {
        return new Date(this.actualDownTime * 1000).toISOString().substr(11, 8);
    }



}





