
const batch = JSON.parse(document.querySelector('#getBatches').value);
const runningBatchForm = document.querySelector('.running-batch-form');
const batchList = document.querySelector('.batch-list');
const date = document.getElementById('date');
const machine = document.getElementById('machine');
const batchNo = document.getElementById('batchNo');
const product = document.getElementById('product');
const target = document.getElementById('target');
const ppt = document.getElementById('ppt');
const pst = document.getElementById('pst');
let response = batch;

(function ($) {
    "use strict";

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function (e) {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        if (check == true) {
            let status
            try {
                status = response[Number(machine.value)].status;
            }
            catch (err) {
                status = 'NONE';
            }

            console.log(response)

            if (status === 'RUNNING') {
                alert('This Machine is already running other batch !! Stop the running batch first');
            } else {
                fetch("http://" + document.domain + ":3000/post-inputs", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        status: 'starting',
                        date: date.value,
                        machine: machine.value,
                        batchNo: batchNo.value,
                        product: product.value,
                        target: target.value,
                        ppt: ppt.value,
                        pst: pst.value,
                    })
                }).then((res) => {
                    res.json()
                        .then((res) => {
                            console.log(res)
                            response = res;
                            renderRunningBatches(response);
                        })
                }).catch((err) => { console.log(err) })
            }
        }

        e.preventDefault();
        return check;
    });


    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function () {
        if (showPass == 0) {
            $(this).next('input').attr('type', 'text');
            $(this).find('i').removeClass('fa-eye');
            $(this).find('i').addClass('fa-eye-slash');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type', 'password');
            $(this).find('i').removeClass('fa-eye-slash');
            $(this).find('i').addClass('fa-eye');
            showPass = 0;
        }

    });


})(jQuery);

const clearData = () => {
    date.value = '';
    batchNo.value = '';
    machine.value = '';
    product.value = '';
    target.value = '';
    ppt.value = '';
    pst.value = '';
}

renderRunningBatches = (batch) => {
    while (batchList.firstChild) {
        batchList.removeChild(batchList.firstChild);
    }
    batch.map((batch) => {
        if (batch.status == 'RUNNING') {
            runningBatchForm.style.display = 'flex';
            console.log(batch.machine)
            const li = document.createElement('li');
            li.className = 'list-item flex-c-m m-t-20';
            li.innerHTML =
                li.innerHTML = `
        <div class="row" id=${batch.machineNo}>
            <div class="m-t-10" style="width=200px">
              <p class="txt-input-form">${'Running > > >'}</p>
              </br>
              <p class="txt-input-form">${'Batch No: ' + batch.batchNo}</p>
              </br>
              <p class="txt-input-form" name="machine">${'Machine: ' + batch.machine}</p>
              </br>
              <p class="txt-input-form">${batch.product}</p>
            </div>
            <button class="stop-btn">Stop</button>
        </div>
                    `;
            batchList.appendChild(li);
        }
    })
    runningBatchForm.appendChild(batchList);
    clearData();
}

renderRunningBatches(batch);

batchList.addEventListener('click', (e) => {
    if (e.target.className == 'stop-btn') {

        const ret = confirm("Do you want to stop this batch ?");
        if (ret == true) {

            fetch("http://" + document.domain + ":3000/post-inputs", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        status: 'ending',
                        machine: e.target.parentElement.id,
                    })
                }).then((res) => {
                    res.json()
                        .then((res) => {
                            console.log(res)
                            response = res;
                            renderRunningBatches(response);
                        })
                }).catch((err) => { console.log(err) })


            // let xhr = new XMLHttpRequest();
            // let url = "http://" + document.domain + ":3000/post-inputs";
            // xhr.open("POST", url, true);
            // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            // xhr.send(`status=stopping&machine=${e.target.parentElement.id}`);

            e.target.parentElement.parentElement.remove();

            response[e.target.parentElement.id].status = 'FINISHED';
        }
    }
    console.log(batchList.children)
    if (batchList.children.length == 0) {
        runningBatchForm.style.display = 'none';
    }
})

