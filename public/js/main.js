//inicialização do socketIO
var socket = io("/");



function verificarSeEEventoOuCliente(cliente){
    
    if ($("#listaClientes").parent().attr('id') == 'formulario_evento'){       
        return ('<input type="button" id="btnInserirClienteNoEvento" name="btn_inserir_cliente" id_cliente="'+cliente.id_cliente+'" class="btn btn-default" value="Inserir" onclick="inserirClienteNoEvento(this)">');
    }else if($("#listaClientes").parent().attr('id') == 'formulario_clientes'){       
        return ('<button class="btn btn-default">Editar</button>&nbsp;&nbsp;<button class="btn btn-default">Excluir</button>');
    }
}

//função que envia ao servidor a requisição para envio da lista de clientes disponível no bd
function solicitarListaClientes(){
    //caso o campo nome_cliente tenha mais de dois caracteres, é feita a busca no bd, caso contrário a lista é mantida vazia.
    let nomeCliente = document.getElementById("nome_cliente").value;
    if(nomeCliente.length > 2){
        socket.emit("listaClientesPorNome", nomeCliente);
    }else{
        document.getElementById("listaClientes").innerHTML = '';
    }
}

//#################FUNÇÕES DE EVENTOS ########################### 

//função que faz a troca dos campos dentro da div "espacoNomeCliente", recolocando o texto e o input text que existia ao carregamento da página
function trocarCliente(){
    
    let campoInserirCliente = '<label for="nome_cliente">Nome do Cliente</label>' +
                            '<input type="text" class="form-control" name="nome_cliente" id="nome_cliente" onkeyup="solicitarListaClientes()">';
    document.getElementById("espacoNomeCliente").innerHTML = campoInserirCliente;
}

//responsável pelo controle do botão que aparece dinâmicamente em cada cliente disponível para escolha
//o envio do id do cliente via post foi feito colocando um input type text oculto abaixo do botão "trocar cliente";
function inserirClienteNoEvento(botao){
    let paiBotao = botao.parentElement; 
    let nomeClienteSelecionado = paiBotao.childNodes[3].innerText;   
    let dadosDoClienteSelecionado = "Cliente Selecionado: "+ nomeClienteSelecionado + ", id: " + botao.getAttribute("id_cliente") + "<br>" +
    "<input type='button' value='Trocar cliente' class='btn btn-default' id='botaoTrocarCliente' onclick='trocarCliente()'>" +
    '<input type="text" class="form-control" value=' + botao.getAttribute("id_cliente") + ' id="id_cliente" name="id_cliente" style="display: none;">';
    console.log(dadosDoClienteSelecionado);
    document.getElementById("espacoNomeCliente").innerHTML = dadosDoClienteSelecionado;
    document.getElementById("listaClientes").innerHTML = '';
}


//inserção dos brinquedos no evento
function inserirBrinquedosNoEvento(){
    if (document.getElementById('data').value == ''){
        
    }
    socket.emit("enviarBrinquedosDisponiveis", document.getElementById("data").value);
    socket.on("receberBrinquedosDisponiveis", function(brinquedos){
        let listaBrinquedos = '<h1>Lista de brinquedos</h1>';

        brinquedos.forEach(brinquedo => {
            listaBrinquedos += '<div class="col-md-4" style="margin-top: 30px; margin-left: auto; margin-right: auto; height: 300px;">' +            
                                    '<div style="width: 200px;">' +
                                        '<img src="'+ brinquedo.foto_brinquedo +'" width="200px" >' +
                                    '</div>' +
                                    brinquedo.nome_brinquedo +
                               '</div>';
        });
        listaBrinquedos += '<input type="button" class="btn btn-default">';
        document.getElementById("espaco_lista_brinquedos").innerHTML = listaBrinquedos;
    });
}


//Inicialização do JQuery
$(document).ready(function(){ 
    
    $("#btn_iserir_brinquedos_no_evento").click(function(){
        inserirBrinquedosNoEvento();
    });

    //#################FUNÇÕES DE CLIENTES ###########################
    //função de evento keyup do campo nome_cliente
    //essa função é utilizada pela página inserirEvento e listarCliente
    
    $("#nome_cliente").keyup(function(){
        solicitarListaClientes();
    });

    

    //função que recebe a consulta da lista de clientes no bd, conforme o filtro solicitado
    //essa função é utilizada pela página inserirEvento e listarCliente
    socket.on("mandarClientes", function(clientes){
        
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
                        listaClientes += cliente.complemento+', &nbsp;&nbsp;';
                    
                    if(cliente.observacao_endereco)
                        listaClientes += cliente.observacao_endereco;
                    listaClientes +=
                    'Cidade: '+ cliente.cidade +'<br>'+
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
            $("#listaClientes").wrapInner(listaClientes); 
            
        
    });

    //#################FUNÇÕES DE BRINQUEDOS ###########################
    $("#nome_brinquedo").keyup(function(){
        //caso o campo nome_brinquedo tenha mais de dois caracteres, é feita a busca no bd, caso contrário a lista é mantida vazia.
        //essa função é utilizada pela página listarBrinquedos
        if($("#nome_brinquedo").val().length > 2){
            socket.emit("listaBrinquedosPorNome",$("#nome_brinquedo").val());
        }else{
            document.getElementById("listaBrinquedos").innerHTML = '';
        }
    });

    //função que recebe a consulta da lista de clientes no bd, conforme o filtro solicitado
    //essa função é utilizada pela página listarBrinquedos
    socket.on("mandarBrinquedos", function(brinquedos){
        
        let listaBrinquedos = '';
        //preenchimento da lista de clientes filtrada na variável listaClientes
        brinquedos.forEach(brinquedo => {
            listaBrinquedos += 
            '<div class="col-md-4" style="margin-top: 30px; margin-left: auto; margin-right: auto; height: 300px;">' +
                '<div style="width: 200px;">'+
                    '<img src="'+brinquedo.foto_brinquedo+'" width="200px" >' +
                '</div>'+
                'Id do Brinquedo: '+ brinquedo.id_brinquedo +'<br>' +
                'Nome: '+ brinquedo.nome_brinquedo +' <br>' +
                'Características: '+ brinquedo.caracteristicas +'<br>' +
                'Valor da locação: '+ brinquedo.valor_brinquedo + '<br>' +
                'Quantidade em Estoque: ' + brinquedo.quantidade + '<br>';
                if(brinquedo.observacao)
                    listaBrinquedos += 'Observação: ' + brinquedo.observacao +
            '</div>';
        }); 
        //envio das informações para a página
        $("#listaBrinquedos").wrapInner(listaBrinquedos);     
    });
    
});

