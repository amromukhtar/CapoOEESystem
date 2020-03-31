const tab = document.getElementById('tab');
const terpkoA = document.getElementById('terpko-A');
const terpkoB = document.getElementById('terpko-B');
const terpkoC = document.getElementById('terpko-C');
const reportsList = document.querySelector('.report-list');
let reports = [];
// let reports = [{ batchNo: 10, machine: 'Terpko A', product: 'Milk' }, { batchNo: 20, machine: 'Terpko B', product: 'Milk' }];

fetchRequest('Terpko A');
tab.addEventListener('click', (e) => {

    const tabArray = Array.from(tab.children);
    tabArray.map((child) => {
        child.className = child.className.replace(" active", "");
    })
    fetchRequest(e.target.textContent);
    e.target.className += " active"

})

const renderReports = (reports) => {
    while (reportsList.firstChild) {
        reportsList.firstChild.remove();
    }

    if (reports.length == 0) {
        const text = document.createElement('p');
        text.className = "txt7 m-t-200";
        text.textContent = "No Batches Found";
        reportsList.appendChild(text);
    } else {
        reports.map((report, index) => {
            const reportItem = document.createElement('li');
            reportItem.className = "report-item row";
            reportItem.innerHTML = `
        <div class="col m-l-10" style="flex-basis: 100%;">
            <div style="flex-basis: 10%; width:100%; margin-top:10px;">
            <img src="/images/icons/download.png" class="download" id="${index}" >
            </div>
            <div class="flex-c-m col" style="flex-basis: 90% background-color:white; margin-top:10px;">
                <img src="/images/capo-milk.jpg" width="140px" height="140px">
                <p class="txt7 m-t-10">Batch No</p>
                <p class="txt7">${report.batchNo}</p>
            </div>
            </div>
            <div class="col" style="flex-basis: 200%; background-color: rgba(240, 71, 65, 0.733);">
                <div class="row" style="flex-basis: 65%; padding: 15px;">
                    <div
                        style="flex-basis: 100%;margin-left: 15px;  display: flex; flex-direction: column;justify-content: space-around; border-right: 1px solid rgb(114, 100, 100);">
                        <div class="row">
                            <p class="txt2">Target :</p>
                            <p class="txt2">${report.target}</p>
                        </div>
                        <div class="row">
                            <p class="txt2">Actual :</p>
                            <p class="txt2">${report.actual}</p>
                        </div>
                        <div class="row">
                            <p class="txt2">M.Eff :</p>
                            <p class="txt2">${report.meff}</p>
                        </div>
                        <div class="row">
                            <p class="txt2">Downtime :</p>
                            <p class="txt2">${report.downTime}</p>
                        </div>
                    </div>
                    <div
                        style="flex-basis: 100%;margin-left: 15px; display: flex; flex-direction: column;justify-content: space-around;">

                        <p class="txt2">OEE : ${report.oee}</p>
                        <p class="txt2">Quality : ${report.quality}</p>
                        <p class="txt2">Availability : ${report.availability}</p>
                        <p class="txt2">Performance : ${report.performance}</p>
                    </div>
                </div>
                <div
                    style="flex-basis: 35%; display: flex;align-items: center; flex-direction: column;justify-content: space-around; ">
                    <p class="txt2">Date ${report.date.date} at 12:12:00 To 16:12:00</p>
                    <p class="txt2">PPT 01:50:00 PST 00:10:00</p>
                    <p class="txt2">Supervisor : ${report.supervisor} </p>
                </div>
            </div>
        `;
            reportsList.appendChild(reportItem);
        })
    }

}


reportsList.addEventListener('click', (e) => {
    if (e.target.className == "download") {
        console.log(reports[e.target.id]);
        downloadReport(reports[e.target.id]);
    }
})


function fetchRequest(machine) {
    return new Promise((resolve, rejecet) => {
        fetch("http://" + document.domain + ":3000/reports/machine", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                machine: machine,
            })
        }).then((res) => {
            res.json()
                .then((res) => {
                    reports = res;
                    renderReports(res);
                    resolve(res);
                })
        }).catch((err) => { rejecet(err) })
    })
}

function downloadReport(report) {
    fetch("http://" + document.domain + ":3000/reports/download", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(report)
    }).then(resp => resp.blob())
        .then(blob => {
            // blob.name = 'Terpok A_810_03-31-2020';
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            // a.style.display = 'none';
            a.href = url;
            a.download = report.machine+'_'+report.batchNo+'_'+report.date.date
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            // alert('your file has downloaded!'); // or you know, something with better UX...
        })
        .catch(() => alert('oh no!'));
}

// renderReports();

window.onscroll = function () { myFunction() };
// var tab = document.getElementById("nav");
var sticky = tab.offsetTop;
function myFunction() {
    if (window.pageYOffset >= sticky) {
        tab.classList.add("sticky");
    } else {
        tab.classList.remove("sticky");
    }
}