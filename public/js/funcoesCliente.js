//#################FUNÇÕES DE CLIENTES ###########################

//inicialização do socketIO
var socket = io("/");
var clientesGlobal;
var filtroCliente;


//envia os dados para filtro no db e caso não exista nenhum campo com mais de 3
//caracteres ela apaga os dados da div listaClientes
function filtrarClientes(){
    filtroCliente = {
        nome : $("#nome").val(), 
        data : $("#data").val(),
        logradouro : $("#logradouro").val(),
        cidade : $("#cidade").val()
    }

    if(filtroCliente.nome.length < 3 &&
        filtroCliente.logradouro.length < 3 &&
        filtroCliente.cidade.length < 3 &&
        filtroCliente.data.length < 10){
            document.getElementById("listaClientes").innerHTML = '';
    }else{
        socket.emit("filtroCliente", filtroCliente);
    };            
}

//#########Exclusão de cliente############3

//preenche a janela modal com os eventos relacionados ao cliente a ser excluído
function pegarEventosPorIdCliente(idCliente){
    socket.emit("listarEventosPorIdCliente", idCliente);
    $("#id_cliente_excluir").val(idCliente);
    console.log($("#id_cliente_excluir").val());   
}

socket.on("resultadoExclusaoCliente", function(mensagem){
    console.log(mensagem);
    if(mensagem.errno){
        alert("Ocorreu um erro");
    }else{
        alert("Excluído");
    }
    filtrarClientes();
});

$(document).ready(function(){ 


    
    //função de evento keyup do campo nome_cliente
    //essa função é utilizada pela página inserirEvento e listarCliente

    
    $("#nome").keyup(function(){
        filtrarClientes();
    });
    $("#logradouro").keyup(function(){        
        filtrarClientes();
    });
    $("#cidade").keyup(function(){
        filtrarClientes();
    });
    $("#data").change(function(){
        filtrarClientes();
    });

    //Listar todos os clientes
    $("#listar-todos-clientes").click(function(){
        document.getElementById("listaClientes").innerHTML = '';
        let filtroCliente = {
            nome : "", 
            data : "",
            logradouro : "",
            cidade : ""
        }
        $("#nome").val(""); 
        $("#data").val("");
        $("#logradouro").val("");
        $("#cidade").val("");
        socket.emit("filtroCliente", filtroCliente);
    });

    //função que recebe a consulta da lista de clientes no bd, conforme o filtro solicitado
    //essa função é utilizada pela página inserirEvento e listarCliente
    socket.on("mandarClientes", function(clientes){
            clientesGlobal = clientes;
            let listaClientes = '';
            //preenchimento da lista de clientes filtrada na variável listaClientes
            clientes.forEach(cliente => {
                listaClientes += 
                '<div id="cliente_individual" style="margin-top: 30px; margin-left: auto; margin-right: auto; width: max-content;">' +
                    'Id de Cliente: '+ cliente.id_cliente +'<br>' +
                    'Nome: <span>'+ cliente.nome +'</span> <br>' +
                    'CPF: '+ cliente.cpf +'<br>' +
                    'Endereço: '+ cliente.logradouro +'&nbsp;&nbsp;' +
                    cliente.numero + ',&nbsp;&nbsp;';
                    if(cliente.complemento)
                        listaClientes += "Complemento: " + cliente.complemento+', &nbsp;&nbsp;';                    
                    if(cliente.observacao_endereco)
                        listaClientes += "Observação do endereço: " + cliente.observacao_endereco;
                    listaClientes +=
                    ' Cidade: '+ cliente.cidade +'<br>'+
                    'Telefone: '+ cliente.telefone +'<br>';
                    if(cliente.telefone_recado)
                        listaClientes += 'Telefone para recados: '+ cliente.telefone_recado +'<br>';
                    listaClientes +=
                    'Email: '+cliente.email +'<br>';
                    if(cliente.observacao_cliente)
                        listaClientes += 'Observação: '+cliente.observacao_cliente+'<br>';
                    listaClientes += verificarSeEEventoOuCliente(cliente) +
                    '<hr>'+
                '<div>';
            });
         
            //envio das informações para a página
            document.getElementById("listaClientes").innerHTML = '';
            $("#listaClientes").wrapInner(listaClientes);
            
    });

    
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

    //preencher janela para edição do cliente
    $(document).on("click", "#btnEditarCliente", function(origemClick){
        let idCliente = origemClick.target.value;
        clientesGlobal.forEach(cliente => {
            if(cliente.id_cliente == idCliente){

                $("#id_cliente").val(cliente.id_cliente);
                $("#nome_edicao").val(cliente.nome);
                $("#cpf").val(cliente.cpf);
                $("#logradouro_edicao").val(cliente.logradouro);
                $("#numero").val(cliente.numero);
                $("#complemento").val(cliente.complemento);
                $("#observacao_endereco").val(cliente.observacao_endereco);
                $("#cidade").val(cliente.cidade);
                $("#telefone").val(cliente.telefone);
                $("#telefone_recado").val(cliente.telefone_recado);
                $("#email").val(cliente.email);
                $("#observacao_cliente").val(cliente.observacao_cliente);
            }
        });
    });

    $('#form-cliente').submit(function(){
        var dados = $( this ).serialize();

        $.ajax({
            type: "POST",
            url: "/editarCliente",
            data: dados,
            success: function( data )
            {
                $("#fecharModal").trigger("click");
                alert(data);
                filtrarClientes();//realiza nova busca de clientes com o mesmo filtro da última
                                  //pois a variável filtroCliente é global e armazena os itens filtrados.                               
            }
        });

        return false;
    });   
    $('#form-excluir-cliente').submit(function(){
        var dados = $( this ).serialize();

        $.ajax({
            type: "POST",
            url: "/excluirCliente",
            data: dados,
            success: function( data )
            {
                $("#fecharModalExcluir").trigger("click");
                alert(data);
                filtrarClientes();//realiza nova busca de clientes com o mesmo filtro da última
                                  //pois a variável filtroCliente é global e armazena os itens filtrados.                               
            }
        });

        return false;
    });   
      
});


