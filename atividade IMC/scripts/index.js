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


function showSweetAlert(icon, titulo, mensagem, functionConfirmed =null){
    Swal.fire({
        title: titulo,
        icon: icon,
        text: mensagem
    }).then((result)=>{
        if(result.isConfirmed){
            if(functionConfirmed!=null){

                setTimeout(functionConfirmed,500)
                
            }
        }
    })
}

function validaDados(){

    var isValido = true;

    var altura = String(inputAltura.value).replace(',','.')
    var peso = String(inputPeso.value).replace(',','.');

    
    if(inputAltura.value.trim()=='' || inputPeso.value.trim()==''){
        showSweetAlert('error','Erro','Preencha todos os campos antes de continuar',()=>{
            inputAltura.focus();
        });
        isValido = false;
        
    }
    else if(Number.isNaN(Number(altura)) || Number.isNaN(Number(peso))) 
    {
        showSweetAlert('error','Erro','Tipo de dado inválido na altura ou peso!',()=>{
            inputAltura.focus();
            limparCampos();
            inputAltura.setAttribute('type','number');
            inputPeso.setAttribute('type','number');
        });
        isValido = false;
        
    }else{
        altura = Number(inputAltura.value);
        peso = Number(inputPeso.value);

        if(altura > 2.85){
            showSweetAlert('info','Erro?',`Você tem ${altura} M de altura? Se sim fale com o Guinness, pois a pessoa mais alta do mundo tem apenas 2.85 cm de altura!`,()=>{
                inputAltura.value='';
                inputAltura.focus();
            });
            
            isValido=false;
        }else if(peso > 595){
            showSweetAlert('info','Erro?',`Você tem ${peso} KG? Se sim fale com o Guinness, pois a pessoa mais pesada do mundo tem apenas 595 KG`,()=>{
                inputPeso.value='';
                inputPeso.focus
            });
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
            setTimeout(()=>{
                inputAltura.value='';
                inputPeso.value='';
                inputAltura.focus();
            },500);
            
        }
    });
}

function limparCampos(){
    inputAltura.value='';
    inputPeso.value='';
}