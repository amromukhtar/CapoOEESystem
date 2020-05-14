const logoutBtn = document.getElementById('logout');
const logoutForm = document.getElementById('logout-form');
const pageTitle = document.getElementById('pageTitle')

logoutBtn.addEventListener('click', (e) => {
    // console.log(e.target);
    logoutForm.submit();
})

// window.onbeforeunload = function (e) {
//     var e = e || window.event;
//     var msg = "Do you want to logout ?"
//     logoutForm.submit();
//     // For IE and Firefox
//     if (e) {
//         e.returnValue = msg;
//     }

//     // For Safari / chrome
//     return msg;
//  };

// window.onbeforeunload = function (e) {
//     e.preventDefault();
//     if (pageTitle.textContent == 'Home') {
//         logoutForm.submit();
//         this.console.log('step1');
//         this.console.log(pageTitle.textContent)
//     }
// }
