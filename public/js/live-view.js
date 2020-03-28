const socket = io({ transports: ['websocket'], upgrade: false });

const table = document.querySelector('.table');
const navBar = document.querySelector('.nav-bar');
const loader = document.querySelector('.loader');

// const runningBatches = JSON.parse(document.getElementById('runningBatches').value);
const batchNo = document.getElementById('batchNo');
const machine = document.getElementById('machine');
const product = document.getElementById('product');
const date = document.getElementById('date');


const label1 = document.getElementById('label1');
const label2 = document.getElementById('label2');
const label3 = document.getElementById('label3');
const label4 = document.getElementById('label4');

const field1 = document.getElementById('field1');
const field2 = document.getElementById('field2');
const field3 = document.getElementById('field3');
const field4 = document.getElementById('field4');

const batchParameters = [];
let workingBatchIndex = [];
let index = 0;

socket.on('batch1', parameters => { batchParameters[0] = parameters; });

socket.on('batch2', parameters => { batchParameters[1] = parameters; });

socket.on('batch3', parameters => { batchParameters[2] = parameters; });

const runBatches = () => {
    workingBatchIndex = []
    batchParameters.map((batch, index) => {
        if (batch.running == true) {
            workingBatchIndex.push(Number(batchParameters[index].machineNo));
            console.log('element', batch, index);
        }
    })
    return workingBatchIndex.length;
}

const updateIndex = () => {
    setInterval(() => {
        let batchesLenght = 0
        batchesLenght = runBatches();
        index++;
        if (index === batchesLenght) index = 0;

    }, 10000);
}

const updateValues = () => {
    setInterval(() => {
        let parameters = batchParameters[workingBatchIndex[index]];
        batchNo.textContent = parameters.batchNo;
        machine.textContent = parameters.machine;
        product.textContent = parameters.product;
        date.textContent = parameters.date;

        if (parameters.status === 'RUNNING') {
            label1.textContent = 'TARGET';
            label2.textContent = 'ACTUAL';
            label3.textContent = 'M.EFF';
            label4.textContent = 'DOWN TIME';

            field1.textContent = parameters.target;
            field2.textContent = parameters.actual;
            field3.textContent = parameters.mEff;
            field4.textContent = parameters.downTime;
        }
        else if (parameters.status === 'FINISHED') {
            label1.textContent = 'OEE';
            label2.textContent = 'QUALITY';
            label3.textContent = 'AVAILABLITY';
            label4.textContent = 'PERFORMANCE';

            field1.textContent = parameters.oee;
            field2.textContent = parameters.quality;
            field3.textContent = parameters.availablity;
            field4.textContent = parameters.performance;
        }
    }, 1000);
}


setTimeout(() => {
    runBatches();
    updateValues();
    updateIndex();
    loader.style.display = 'none';
    navBar.style.display = 'flex';
    table.style.display = 'table';
}, 3000);