

function createLoadingContainer (){
    const container = document.createElement('div');
    container.classList.add('loader-wrapper');
    const loadingElement = document.createElement('div');
    loadingElement.classList.add('loader');
    container.appendChild(loadingElement);
    document.body.appendChild(container);  
    return [container, loadingElement]; 
}

const loading = createLoadingContainer();

// showLoading(loading);

// setTimeout(()=>{
//     hideLoading(loading);
// }, 3000)

// function showLoading(loading) {
//     loading.forEach(element => {
//         element.style.display = 'block';
//     });
// }

function hideLoading(loading) {
    loading.forEach(element => {
        element.classList.add('loader-hidden');
        document.body.removeChild(element);
    });
    
}


window.addEventListener('load', ()=>{
    loading.forEach(element=>{
        element.style.opacity = '0';
    })
    setTimeout(()=>{
       hideLoading(loading);
    },200);
})
