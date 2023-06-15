const iconoLogIn = document.getElementById("log-status-in");
const iconoLogOut = document.getElementById("log-status-out");

const visibilityLog = () => {
    const logBoolean = localStorage.getItem('LogStatus');
    if (logBoolean === 'true') {
        console.log('verdadero');
        iconoLogOut.classList.remove('d-none'); 
        iconoLogIn.classList.add('d-none');
    } else {
        iconoLogIn.classList.remove('d-none'); 
        iconoLogOut.classList.add('d-none');
        console.log('falso');
    }
}

visibilityLog();

const setLogStatusFalse = () => {
    localStorage.setItem('LogStatus', JSON.stringify(false));
}


