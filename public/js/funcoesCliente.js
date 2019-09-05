//#################FUNÇÕES DE CLIENTES ###########################

//inicialização do socketIO
var socket = io("/");
var clientesGlobal;
var filtroCliente;
var perfil;




//#########Exclusão de cliente############3

//preenche a janela modal com os eventos relacionados ao cliente a ser excluído
/*
function pegarEventosPorIdCliente(idCliente){
    socket.emit("listarEventosPorIdCliente", idCliente, perfil);
    $("#id_cliente_excluir").val(idCliente);
    console.log($("#id_cliente_excluir").val());   
}*/

socket.on("resultadoExclusaoCliente", function(mensagem){

    if(mensagem.errno){
        alert("Ocorreu um erro");
    }else{
        alert("Excluído");
    }
    filtrarClientes();
});

$(document).ready(function(){ 
    perfil = $("body").attr("perfil");

    
      

    

    
    
    //Essa função determina se a janela que está em uso é a de listagem de clientes, inserção ou listagem de eventos
    function verificarSeEEventoOuCliente(cliente){
        
        if ($("#listaClientes").parent().attr('id') == 'formulario_evento'){ //opção utilizada na tela de inserção de novo evento      
            return ('<input type="button" id="btnInserirClienteNoEvento" name="btn_inserir_cliente" id_cliente="'+cliente.id_cliente+'" class="btn btn-default" value="Inserir" onclick="inserirClienteNoEvento(this)">');
        }else if($("#listaClientes").parent().attr('id') == 'formulario_clientes'){  //opção utilizada na tela de listagem de clientes     
            return ('<button class="btn btn-default" id="btnEditarCliente"  data-toggle="modal" '+ 
                    'data-target="#janelaDeEdicaoCliente" value="'+cliente.id_cliente+'">Editar</button>&nbsp;&nbsp;'+
                    '<button class="btn btn-default" id="btn_excluir_cliente" data-toggle="modal"'+
                    'data-target="#janelaDeRemocaoCliente" onclick="pegarEventosPorIdCliente('+ cliente.id_cliente +')">Excluir</button>');
        }
       
        /*
onclick="exibirJanelaEdicaoCliente(\''+cliente.nome+ '\',\''+cliente.cpf+ '\',\''+cliente.logradouro+ 
            '\',\''+cliente.numero+ '\',\''+cliente.complemento+ '\',\''+cliente.observacaoEndereco+ '\',\''+cliente.cidade+ '\',\''+cliente.telefone+ '\',\''+
                    cliente.telefoneRecado+ '\',\''+cliente.email+ '\',\''+cliente.observacaoCliente+'\')"
         */
    }

    

    
});


