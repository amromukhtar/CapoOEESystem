const dtA = document.getElementById('dt-A');
const dtB = document.getElementById('dt-B');
const dtC = document.getElementById('dt-C');
const dteA = document.getElementById('dte-A');
const dteB = document.getElementById('dte-B');
const dtnP = document.getElementById('dtn-P');

// const ctA = document.getElementById('ct-A');
// const ctB = document.getElementById('ct-B');
// const ctC = document.getElementById('ct-C');
// const cteA = document.getElementById('cte-A');
// const cteB = document.getElementById('cte-B');
// const ctnP = document.getElementById('ctn-P');

const icrTrepko_A = Array.from(document.querySelectorAll('.icrTrepko_A'));
const icrTrepko_B = Array.from(document.querySelectorAll('.icrTrepko_B'));
const icrTrepko_C = Array.from(document.querySelectorAll('.icrTrepko_C'));
const icrErca_A = Array.from(document.querySelectorAll('.icrErca_A'));
const icrErca_B = Array.from(document.querySelectorAll('.icrErca_B'));
const icrNovaPak = Array.from(document.querySelectorAll('.icrNovaPak'));

const submitBtn = document.querySelector('.submit-btn');

const getICR = (machine) => {
    let array = [];
    machine.map((icr) => {
        array.push(+icr.value)
    })
    return array
}

submitBtn.addEventListener('click', (e) => {
    const conf = confirm('Are you sure you want to change machine factors');
    if (conf)
        fetchRequest();
})


function fetchRequest() {

    let icrTA = getICR(icrTrepko_A);
    let icrTB = getICR(icrTrepko_B);
    let icrTC = getICR(icrTrepko_C);
    let icrEA = getICR(icrErca_A);
    let icrEB = getICR(icrErca_B);
    let icrNP = getICR(icrNovaPak);

    fetch("http://" + document.domain + ":3000/settings/factors", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            downTime: [
                Number(dtA.value),
                Number(dtB.value),
                Number(dtC.value),
                Number(dteA.value),
                Number(dteB.value),
                Number(dtnP.value),
            ],
            idealCycleRate: {
                Trepko_A: icrTA,
                Trepko_B: icrTB,
                Trepko_C: icrTC,
                Erca_A: icrEA,
                Erca_B: icrEB,
                NovaPak: icrNP,
            },
        })
    }).then((res) => {
        res.json()
            .then((res) => {
                console.log(res);
            })
    }).catch((err) => { console.log(err) })
}