var inputAltura = document.getElementById('input-altura');
var inputPeso = document.getElementById('input-peso');
var botaoCalcular = document.getElementById('calcular');

botaoCalcular.addEventListener('click',(evt)=>{
    evt.preventDefault();
    validaDados();
});


function showSweetAlert(icon, titulo, mensagem){
    Swal.fire({
        title: titulo,
        icon: icon,
        text: mensagem
    })
}

function validaDados(){

    var isValido = true;

    var altura = String(inputAltura.value).replace(',','.')
    var peso = String(inputPeso.value).replace(',','.');
    
    if(inputAltura.value.trim()=='' || inputPeso.value.trim()==''){
        showSweetAlert('error','Erro','Preencha todos os campos antes de continuar');
        isValido = false;
    }
    else if(typeof Number(altura)!='number' || typeof Number(peso)!='number'){
        showSweetAlert('error','Erro','Tipo de dado inválido na altura ou peso!');
        isValido = false;
    }else{
        altura = Number(inputAltura.value);
        peso = Number(inputPeso.value);

        if(altura > 28.5){
            showSweetAlert('info','Erro?',`Você tem ${altura} cm de altura? Se sim fale com o Guinness, pois a pessoa mais alta do mundo tem apenas 28.5 cm de altura!`);
            isValido=false;
        }else if(peso > 595){
            showSweetAlert('info','Erro?',`Você tem ${peso} KG? Se sim fale com o Guinness, pois a pessoa mais pesada do mundo tem apenas 595 KG`);
            isValido=false;
        }
    }

    

    return isValido;
}