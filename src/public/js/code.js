const horas = document.querySelectorAll('.h');
const formRange = document.querySelectorAll('.form-range');

const renderHours = ()=>{
    formRange.forEach(f=>{
        f.addEventListener('input', e=>{
            horas.forEach(h=>{
                if(h.getAttribute('name')==f.getAttribute('name')){
                    h.textContent=f.value;
                    h.textContent+=' Horas';
                    return;
                }
            });
        });
    });
}

renderHours();