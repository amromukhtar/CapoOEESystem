const dtA = document.getElementById('dt-A');
const dtB = document.getElementById('dt-B');
const dtC = document.getElementById('dt-C');
const dteA = document.getElementById('dte-A');
// const dteB = document.getElementById('dte-B');
// const dtnP = document.getElementById('dtn-P');

// const ctA = document.getElementById('ct-A');
// const ctB = document.getElementById('ct-B');
// const ctC = document.getElementById('ct-C');
// const cteA = document.getElementById('cte-A');
// const cteB = document.getElementById('cte-B');
// const ctnP = document.getElementById('ctn-P');

const icrSimply_8 = Array.from(document.querySelectorAll('.icrSimply_8'));
const icrTFA_A1_200 = Array.from(document.querySelectorAll('.icrTFA_A1_200'));
const icrTFA_A1_500 = Array.from(document.querySelectorAll('.icrTFA_A1_500'));
const icrTCA = Array.from(document.querySelectorAll('.icrTCA'));
// const icrErca_B = Array.from(document.querySelectorAll('.icrErca_B'));
// const icrNovaPak = Array.from(document.querySelectorAll('.icrNovaPak'));

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

    let icrSM = getICR(icrSimply_8);
    let icrTFA2 = getICR(icrTFA_A1_200);
    let icrTFA5 = getICR(icrTFA_A1_500);
    let icrTC = getICR(icrTCA);

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
                // Number(dteB.value),
                // Number(dtnP.value),
            ],
            idealCycleRate: {
                Simply_8: icrSM,
                TFA_A1_200: icrTFA2,
                TFA_A1_500: icrTFA5,
                TCA: icrTC,
            },
        })
    }).then((res) => {
        res.json()
            .then((res) => {
                console.log(res);
            })
    }).catch((err) => { console.log(err) })
}