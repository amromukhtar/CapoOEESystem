const dtA = document.getElementById('dt-A');
const dtB = document.getElementById('dt-B');
const dtC = document.getElementById('dt-C');
const dteA = document.getElementById('dte-A');
const dteB = document.getElementById('dte-B');
const dtnP = document.getElementById('dtn-P');

const ctA = document.getElementById('ct-A');
const ctB = document.getElementById('ct-B');
const ctC = document.getElementById('ct-C');
const cteA = document.getElementById('cte-A');
const cteB = document.getElementById('cte-B');
const ctnP = document.getElementById('ctn-P');

const submitBtn = document.querySelector('.submit-btn');

submitBtn.addEventListener('click', (e) => {
    const conf = confirm('Are you sure you want to change machine factors');
    if (conf)
        fetchRequest();
})


function fetchRequest() {
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
            cycleTime: [
                Number(ctA.value),
                Number(ctB.value),
                Number(ctC.value),
                Number(cteA.value),
                Number(cteB.value),
                Number(ctnP.value)
            ],
        })
    }).then((res) => {
        res.json()
            .then((res) => {
                console.log(res);
            })
    }).catch((err) => { console.log(err) })
}