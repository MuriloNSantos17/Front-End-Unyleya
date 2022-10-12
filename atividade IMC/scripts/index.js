var inputAltura = document.getElementById('input-altura');
var inputPeso = document.getElementById('input-peso');
var botaoCalcular = document.getElementById('calcular');

botaoCalcular.addEventListener('click',(evt)=>{
    evt.preventDefault();

    if(validaDados()){

        var altura = String(inputAltura.value).replace(',','.')
        var peso = String(inputPeso.value).replace(',','.');

        altura = Number(altura);
        peso = Number(peso);

        var imc = peso / (altura*altura);

        imc = Number(imc).toFixed(1);

        verificaImc(imc);
    }
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

function verificaImc(imc){

    var descricao=null;
    var img = null;

    if(imc < 18.5){
        descricao = "Abaixo do Peso";
        img = 'img_abaixo_peso.jpg';
    }
    else if(imc >= 18.5 && imc <=24.9){
        descricao = "Normal";
        img = 'img_peso_normal.jpg';
    }
    else if(imc >= 25 && imc <=29.9){
        descricao = "Acima do Peso";
        img = 'img_sobrepeso.jpg';
    }
    else if(imc >= 30 && imc <=34.9){
        descricao = "Obeso";
        img = 'img_obesidade.jpg';
    }
    else if(imc >= 35 && imc <=39.9){
        descricao = "Obesidade II";
        img = 'img_obesidade_2.jpg';
    }
    else {
        descricao = "Obesidade III";
        img = 'img_obesidade_3.jpg';
    }

    showResultado(img,descricao);
}

function showResultado(img, descricao){
    Swal.fire({
        title: `Resultado: ${descricao}`, 
        html: `<img src="./images/${img}">`,  
        confirmButtonText: "Voltar", 
    }).then((result)=>{

        if(result.isConfirmed){
            inputAltura.value='';
            inputPeso.value='';
            inputAltura.focus();
        }
    });
}