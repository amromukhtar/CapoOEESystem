const logoutBtn = document.getElementById('logout');
const logoutForm = document.getElementById('logout-form');

logoutBtn.addEventListener('click', (e) => {
    // console.log(e.target);
    logoutForm.submit();
})