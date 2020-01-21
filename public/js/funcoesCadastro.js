// Exemplo de JavaScript inicial para desativar envios de formulário, se houver campos inválidos.
(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Pega todos os formulários que nós queremos aplicar estilos de validação Bootstrap personalizados.
      var forms = document.getElementsByClassName('needs-validation');
      // Faz um loop neles e evita o envio
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();

function validar(campo, validade){
    console.log(campo);
    console.log(validade);
    let objeto = document.getElementById(campo);
    if(validade){
        if(objeto.classList.contains("is-invalid")){
            objeto.classList.remove("is-invalid");
        }
        objeto.classList.add("is-valid");
    }else{
        if(objeto.classList.contains("is-valid")){
            objeto.classList.remove("is-valid");
        }
        objeto.classList.add("is-invalid");
    }   
}


function validaNome(campo){
    let nome = campo.value;
    let temEspaco = false;
    //verificação de espaço -- feita apenas para os campos nome, logradouro e logradouroFesta
    if(campo.id == "nome" || campo.id == "logradouro" || campo.id == "logradouroFesta"){ 
        for(let i = 0; i < nome.length; i++){
            if(nome[i] == " "){
                temEspaco = true;
            }
        }        
    }else{
        temEspaco = true;
    }
    
    if(temEspaco && nome.length > 2){
        if(campo.classList.contains("is-invalid")){
            campo.classList.remove("is-invalid");
        }
        campo.classList.add("is-valid");
    }else{
        if(campo.classList.contains("is-valid")){
            campo.classList.remove("is-valid");
        }
        campo.classList.add("is-invalid");
    }
}

function verificarSeEhCNPJ(valor){
    let resposta = false;
    for(let i = 0; i < valor.length; i++){
        if(valor[i] == '0' && valor[i+1] == '0' && valor[i+2] == '0' && valor[i+3] == 1){
            resposta = true;
        }
    }
    return resposta;
}

function validaCPF(){
    var cpf = document.getElementById("cpf").value;
    if(verificarSeEhCNPJ(cpf)){
        if(cpf.length == 18){
            validar("cpf", true);
        }else {
            validar("cpf", false);
        }
    }else{
        if((cpf[3] == ".")
		&&(cpf[7] == ".")
		&&(cpf[11] == "-")
		&&(cpf.length == 14)
		&&(!isNaN(cpf.substring(0,3)))
		&&(!isNaN(cpf.substring(4,7)))
		&&(!isNaN(cpf.substring(8,11)))
		&&(!isNaN(cpf.substring(12)))
		&&(((parseInt(cpf[0])*10
			+parseInt(cpf[1])*9
			+parseInt(cpf[2])*8
			+parseInt(cpf[4])*7
			+parseInt(cpf[5])*6
			+parseInt(cpf[6])*5
			+parseInt(cpf[8])*4
			+parseInt(cpf[9])*3
			+parseInt(cpf[10])*2)
		    *10%11) == parseInt(cpf[12]))
		&&(((parseInt(cpf[0])*11
			+parseInt(cpf[1])*10
			+parseInt(cpf[2])*9
			+parseInt(cpf[4])*8
			+parseInt(cpf[5])*7
			+parseInt(cpf[6])*6
			+parseInt(cpf[8])*5
			+parseInt(cpf[9])*4
			+parseInt(cpf[10])*3
			+parseInt(cpf[12])*2)
		    *10%11) == parseInt(cpf[13]))
		&& !(cpf[0] == cpf[1] == cpf[2] == cpf[4] == cpf[5] == cpf[6] == cpf[8] == cpf[9] == cpf[10] == cpf[12] == cpf[12])
		){
        if(document.getElementById("cpf").classList.contains("is-invalid")){
            document.getElementById("cpf").classList.remove("is-invalid");
        }
        document.getElementById("cpf").classList.add("is-valid");
		return true;
	}else{
		if(document.getElementById("cpf").classList.contains("is-valid")){
            document.getElementById("cpf").classList.remove("is-valid");
        }
        document.getElementById("cpf").classList.add("is-invalid");
		return false;
	    }
    }
	
}

function validaTelefone(telefone){
    var telefoneVal = telefone.value;;
    if(telefoneVal.length == 13){
        if(telefone.classList.contains("is-invalid")){
            telefone.classList.remove("is-invalid");
        }
        telefone.classList.add("is-valid");        
		return true;
    }else if(telefoneVal.length == 15){
        if(telefone.classList.contains("is-invalid")){
            telefone.classList.remove("is-invalid");
        }
        telefone.classList.add("is-valid");
        return true;
    }else{
        if(telefone.classList.contains("is-valid")){
            telefone.classList.remove("is-valid");
        }
        telefone.classList.add("is-invalid");
        return false;
    }      
}

function validaNumero(campo){
    let numero = campo.value;
    if(numero.length > 0){
        if(campo.classList.contains("is-invalid")){
            campo.classList.remove("is-invalid");
        }
        campo.classList.add("is-valid");        
		return true;
    }else{
        if(campo.classList.contains("is-valid")){
            campo.classList.remove("is-valid");
        }
        campo.classList.add("is-invalid");
        return false;
    }      
}

function validaCheck(campo){
    console.log(campo);    
    if(campo.checked){
        if(campo.classList.contains("is-invalid")){
            campo.classList.remove("is-invalid");
        }
        campo.classList.add("is-valid");        
		return true;
    }else{
        if(campo.classList.contains("is-valid")){
            campo.classList.remove("is-valid");
        }
        campo.classList.add("is-invalid");
        return false;
    }  
}





function monitorEvents(element) {
    var log = function(e) { console.log(e);};
    var events = [];
    
    for(var i in element) {
      if(i.startsWith("on")) events.push(i.substr(2));
    }
    events.forEach(function(eventName) { 
      element.addEventListener(eventName, log); 
    }); 
  }

  


//============== JQUERY =================
$(document).ready(function(){    

    //Capturando inserção de caracteres no campo CPF
    $("#cpf").on("keyup paste input", function(){
        //esse if resolve um bug verificado quando o usuário tentava apagar o 11 caractere
        if(event.keyCode != 8 && event.keyCode != 127){
            let cpf = $("#cpf").val();
            let cpfEnviar = "";        
            let tamCpf = cpf.length;
            let ehCNPJ = false;


            //laço que não permite apenas a inserção de números
            for(let i = 0; i < tamCpf; i++){
                if(cpf.charCodeAt(i) >= 48 && cpf.charCodeAt(i) <= 57){
                    cpfEnviar += cpf[i];
                }          
            }

            //Bloco que decide se o valor será tratado como CNPJ ou como CPF
            if(verificarSeEhCNPJ(cpfEnviar)){
                if(tamCpf > 14){ 
                    cpfEnviar = cpfEnviar.substring(0, 14);                
                }

                //Inserção dos pontos, da barra e do hifem do CNPJ
                if(cpfEnviar.length == 14){
                    if(cpfEnviar[2] != '.'){
                        cpfEnviar = cpfEnviar.substring(0,2) + '.' + cpfEnviar.substring(2, cpfEnviar.length);
                    }
                    if(cpfEnviar[6] != '.'){
                        cpfEnviar = cpfEnviar.substring(0,6) + '.' + cpfEnviar.substring(6, cpfEnviar.length);
                    }
                    if(cpfEnviar[10] != '/'){
                        cpfEnviar = cpfEnviar.substring(0,10) + '/' + cpfEnviar.substring(10, cpfEnviar.length);
                    }
                    if(cpfEnviar[15] != '-'){
                        cpfEnviar = cpfEnviar.substring(0,15) + '-' + cpfEnviar.substring(15, cpfEnviar.length);
                    }             
                }//Fim da inserção dos pontos, da barra e do hifem do CNPJ
            }else{                 
                if(tamCpf > 11){ 
                        cpfEnviar = cpfEnviar.substring(0, 11);                
                }           
                    //Inserção dos pontos e o hifem do CPF
                if(cpfEnviar.length == 11){
                    if(cpfEnviar[3] != '.'){
                        cpfEnviar = cpfEnviar.substring(0,3) + '.' + cpfEnviar.substring(3, cpfEnviar.length);
                    }
                    if(cpfEnviar[7] != '.'){
                        cpfEnviar = cpfEnviar.substring(0,7) + '.' + cpfEnviar.substring(7, cpfEnviar.length);
                    }
                    if(cpfEnviar[11] != '-'){
                        cpfEnviar = cpfEnviar.substring(0,11) + '-' + cpfEnviar.substring(11, cpfEnviar.length);
                    }            
                }//Fim da inserção dos pontos e do hifem do CPF
            }      
            
            $("#cpf").val(cpfEnviar);
        }    
    });

    //Capturando inserção de caracteres no campo telefone
    
    $("#telefone, #telefoneAlternativo").on("keyup paste input", function(){
        if(event.keyCode != 8 && event.keyCode != 127){
            let telefone = $("#"+event.target.id).val();//puxa o valor do campo que disparou a função
            let telefoneEnviar = "";        
                  
            
             
            //laço que não permite apenas a inserção de números e verifica a posição dos pontos e hifem
            for(let i = 0; i < telefone.length; i++){
                if(telefone.charCodeAt(i) >= 48 && telefone.charCodeAt(i) <= 57){
                    telefoneEnviar += telefone[i];
                }  
            }           
           
            //if que insere os pontos e o hifem apenas após a inserção de todos os números para celulares
            
            if(telefoneEnviar.length >= 11){
                           
                if(telefoneEnviar[0] != '('){
                    telefoneEnviar = '(' + telefoneEnviar.substring(0,telefoneEnviar.length);
                }
                
                if(telefoneEnviar[3] != ')'){
                    telefoneEnviar = telefoneEnviar.substring(0,3) + ')' + telefoneEnviar.substring(3,telefoneEnviar.length);
                }
                
                if(telefoneEnviar[5] != '.'){
                    telefoneEnviar = telefoneEnviar.substring(0,5) + '.' + telefoneEnviar.substring(5, telefoneEnviar.length);
                }                
                
                if(telefoneEnviar[10] != '.'){
                    telefoneEnviar = telefoneEnviar.substring(0,10) + '.' + telefoneEnviar.substring(10, (telefoneEnviar.length+1));
                }            
               
            }else if(telefoneEnviar.length == 10 && telefoneEnviar[2] != '9'){
                if(telefoneEnviar[0] != '('){
                    telefoneEnviar = '(' + telefoneEnviar.substring(0,telefoneEnviar.length);
                }
                
                if(telefoneEnviar[3] != ')'){
                    telefoneEnviar = telefoneEnviar.substring(0,3) + ')' + telefoneEnviar.substring(3,telefoneEnviar.length);
                }

                if(telefoneEnviar[8] != '-'){
                    telefoneEnviar = telefoneEnviar.substring(0,8) + '-' + telefoneEnviar.substring(8,telefoneEnviar.length);
                }
            }

            if(telefone.length > 15){
                telefoneEnviar = telefoneEnviar.substring(0, 15);
            }
            
            $("#"+event.target.id).val(telefoneEnviar);
        }    
    });

    $("#copiarEndereco").on("click", function(){
        $("#logradouroFesta").val($("#logradouro").val());
        $("#numeroFesta").val($("#numero").val());
        $("#complementoFesta").val($("#complemento").val());
        $("#bairroFesta").val($("#bairro").val());
        $("#cidadeFesta").val($("#cidade").val());
    });

    //função do botão de cópiar campo para a área de transferência do sistema
    $("#botaoDeCopia").click(function(){
        $("#texto").select();
        console.log($("#texto")[0].innerText);
        document.execCommand("copy");
    });
}); 