const io = require('../app');
const { machine, machine_id, batchName, product, image, getProductNo } = require('../data/data');
const BatchDB = require('../util/database/batch');


module.exports = class Batch {
    constructor() {
        this.running = false;
        this.status = 'FINISHED';
        this.startBatchId = null;
    }

    setBatchValues(parameters, id) {
        // Starting Time
        this.startTime = this.getTime();

        this.supervisor = parameters.supervisor;
        this.batchNo = parameters.batchNo;
        this.batchName = batchName[parameters.machine];
        this.machineNo = parameters.machine;
        this.machine = machine[parameters.machine];
        this.productNo = parameters.product
        this.product = product[machine_id[parameters.machine]][parameters.product];
        this.imageURL = "/images/products/" + image[machine_id[parameters.machine]][parameters.product] + ".png";
        this.target = parameters.target;
        this.actualCount = 0;
        this.ppt = parameters.ppt;
        this.pst = parameters.pst;
        this.totalTime = 0;
        this.date = parameters.date;
        this.tempDownTime = 0;
        this.actualDownTime = 0;
        this.perDefinedDownTime = global.downTime[parameters.machine];
        this.status = 'RUNNING';
        this.liveStatus = 'RUNNING';
        this.running = true;


        // Setting Ideal Cycle Rate
        this.cycleRate = global.idealCycleRate[machine_id[this.machineNo]][getProductNo(this.machineNo, this.productNo)];
        
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
                this.updateParameters();
                io.sendData(this.batchName, {
                    batchNo: this.batchNo,
                    machine: this.machine,
                    machineNo: this.machineNo,
                    product: this.product,
                    imageURL: this.imageURL,
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
                    imageURL: this.imageURL,
                    date: this.date,
                    oee: String((this.oee * 100).toFixed(0)) + " %",
                    quality: this.qualityString,
                    availability: String((this.availability * 100).toFixed(0)) + " %",
                    performance: String((this.performance * 100).toFixed(0)) + " %",
                    running: this.running,
                    status: this.status,
                    liveStatus: this.liveStatus,
                });
            }
        }, 1000);
        return id;
    }

    endBatch = () => {
        // Getting last batch parameters
        this.endTime = this.getTime();

        this.getOEE();
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

    // UTILS

    getSensorsData = () => {
        this.actualCount++;
        this.tempDownTime = 0;

        if (this.actualCount == this.target) {
            this.status = 'FINISHED';
            this.endBatch();
        }

    }

    addBatch = () => {
        const batch = new BatchDB({
            fullDate: new Date(),
            date: this.date,
            startTime: this.startTime,
            endTime: this.endTime,
            batchNo: this.batchNo,
            machine: this.machine,
            product: this.product,
            imageURL: this.imageURL,
            target: this.target,
            actual: this.actualCount,
            ppt: this.pptString,
            pst: this.pstString,
            runTime: this.runTimeString,
            totalTime: this.totalTimeString,
            downTime: this.actualDownTimeMin,
            cycleRate: this.cycleRateString,
            meff: this.getMeff(),
            oee: this.oeeString,
            quality: this.qualityString,
            availability: this.availabilityString,
            performance: this.performanceString,
            supervisor: this.supervisor,
        })
        batch.save((err) => {
            if (err) {
                return console.log(err);
            }
            console.log('Batch Added Successfully');
        })

        // Mongoose V5
        // .then((result) => {
        //     console.log('Batch Added Successfully');
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
    }

    updateParameters = () => {
        // Batch Timer
        this.totalTime++;

        // Downtime Calculation
        this.tempDownTime++;
        this.liveStatus = "RUNNING";
        if (this.tempDownTime > this.perDefinedDownTime) {
            this.actualDownTime++;
            this.liveStatus = "STOPED";
        }
    }

    getDownTime = () => {
        return new Date(this.actualDownTime * 1000).toISOString().substr(11, 8);
    }

    getMeff = () => {
        const meff = (this.totalTime / (this.totalTime + this.actualDownTime)) * 100;
        return String(meff.toFixed(0)) + " %";
    }

    getTime = () => {
        const date = new Date();
        const time = (+date.getHours() == 23 ? 0 : +date.getHours() + 1) + ":" + date.getMinutes() + ":" + date.getSeconds();
        return time;
    }

    getOEE = () => {

        // Run Time = Planned Producation Time - Downtime in min
        // Math.floor(this.totalTime / 60)
        this.totalTimeMin = Number(this.totalTime) / 60;
        this.runTime = this.totalTimeMin - (Number(this.actualDownTime) / 60);

        // Availability = Run Time / Planned Producation Time
        this.availability = this.runTime / this.totalTimeMin;

        // Performanace = (Total Counts / Run Time) / Ideal Cycle Time Rate
        this.performance = (this.actualCount / this.runTime) / this.cycleRate;

        // Quality = 
        this.quality = 100;

        // OEE = A * P * Q
        this.oee = this.availability * this.performance;

        // For Sending As String 
        // All values should be in min
        this.actualDownTimeMin = String(Math.floor(this.actualDownTime / 60) + ' min');
        this.runTimeString = String(Math.floor(this.runTime) + ' min');
        this.totalTimeString = String(Math.floor(this.totalTimeMin) + ' min');
        this.pptString = this.ppt + ' min';
        this.pstString = this.pst + ' min';
        this.cycleRateString = this.cycleRate + ' Pieces/min'
        this.qualityString = "100 %";
        this.availabilityString = String(this.availability.toFixed(3) * 100).slice(0, 4) + " %";
        this.performanceString = String(this.performance.toFixed(3) * 100).slice(0, 4) + " %";
        this.oeeString = String(this.oee.toFixed(3) * 100).slice(0, 4) + " %";

    }



}





