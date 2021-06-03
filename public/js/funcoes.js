var clientesGlobal; //utilizada na edição de clientes




//usado em:
//listarCliente.ejs, inserirEvento.ejs


//recebe lista de clientes => escutaSocketIO => 'mandarClientes'
//verifica quem pediu e entrega
function enviarClientesParaPagina(clientes){
    //verificar quem pediu
    let paginaQuePediuLista = document.getElementById("listaClientes").parentElement.attributes.id.value;
    if(paginaQuePediuLista == "formulario_clientes"){ 
        preencherJanelaDeListarCliente(clientes);
    }else if(paginaQuePediuLista == "insercaoClienteNoEvento"){
        preencherJanelaDeInserirEvento(clientes);
    }
}

//envia os dados para filtro no db e caso não exista nenhum campo com mais de 3
//caracteres ela apaga os dados da div listaClientes
    function filtrarClientes(nome, data, logradouro, cidade){
      filtroCliente = {
          nome : nome, 
          data : data,
          logradouro : logradouro,
          cidade : cidade
      }
      socket.emit("filtroCliente", filtroCliente, perfil);//resposta vem no escutasSocketIO => mandarClientes              
    }

//recebe a lista de clientes e preenche na janela listarCliente.ejs
function preencherJanelaDeListarCliente(clientes){
    let listaClientes = '';
    clientesGlobal = clientes;
    //preenchimento da lista de clientes filtrada na variável listaClientes
    clientes.forEach(cliente => {
        listaClientes += 
        '<div id="cliente_individual" style="margin-top: 30px; width: max-content;">' +
            'Id de Cliente: <span>'+ cliente.id_cliente +'</span><br>' +
            'Nome: <span>'+ cliente.nome +'</span> <br>' +
            'CPF: <span>'+ cliente.cpf +'</span><br>' +
            'Endereço: <span>'+ cliente.logradouro +'</span>&nbsp;&nbsp;<span>' +
            cliente.numero + '</span>,&nbsp;&nbsp;';
            if(cliente.complemento)
                listaClientes += "Complemento: <span>" + cliente.complemento+'</span>, &nbsp;&nbsp;';                    
            if(cliente.observacao_endereco)
                listaClientes += "Observação do endereço: <span>" + cliente.observacao_endereco +'</span>';
            listaClientes +=
            ' Cidade: <span>'+ cliente.cidade +'</span><br>'+
            'Telefone: <span>'+ cliente.telefone +'</span><br>';
            if(cliente.telefone_recado)
                listaClientes += 'Telefone para recados: <span>'+ cliente.telefone_recado +'</span><br>';
            listaClientes +=
            'Email: <span>'+cliente.email +'</span><br>';
            if(cliente.observacao_cliente)
                listaClientes += 'Observação: <span>'+cliente.observacao_cliente+'</span><br>';
            listaClientes += 
            '<button class="btn btn-default" id="btnEditarCliente"  data-toggle="modal" '+ 
                'data-target="#janelaDeEdicaoCliente" value="'+cliente.id_cliente+'">Editar</button>&nbsp;&nbsp;'+
            '<button class="btn btn-default" id="btn_excluir_cliente" data-toggle="modal"'+
                'data-target="#janelaDeRemocaoCliente" value="'+cliente.id_cliente+'">Excluir</button>' +
            '<hr>'+
        '</div>';
    });
     
    document.getElementById("listaClientes").innerHTML = listaClientes;
}

//recebe a lista de clientes e preenche na janela inserirEvento.ejs
function preencherJanelaDeInserirEvento(clientes){
    clientesGlobal = clientes;
    let listaClientes = '';
    //preenchimento da lista de clientes filtrada na variável listaClientes
    clientes.forEach(cliente => {
        listaClientes += 
        '<div id="cliente_individual" style="margin-top: 30px; width: max-content;">' +
            'Id de Cliente: <span>'+ cliente.id_cliente +'</span> <br>' +
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
            listaClientes += '<input type="button" id="btnInserirClienteNoEvento" '+
                        'name="btn_inserir_cliente" id_cliente="'+cliente.id_cliente+
                        '" class="btn btn-default" value="Inserir" data-dismiss="modal" onclick=\"inserirClienteNoEvento(this)\">'
    });
    document.getElementById("listaClientes").innerHTML = listaClientes;
}

//Emissor de mensagems tipo "snackbar"
function emitirAviso(mensagem, id, tempo){
    let snackbar = document.getElementById(id);
    snackbar.innerHTML = mensagem;
    snackbar.className = "show";
    setTimeout(function(){snackbar.className = snackbar.className.replace("show", ""); }, tempo);
}

//preencher a tela de edição dos brinquedos
function preencherModalEdicaoBrinquedo(id_brinquedo,nome_brinquedo,caracteristicas,valor_brinquedo,quantidade,observacao){
    $("#id_brinquedo").val(id_brinquedo);
    $("#nome_edicao").val(nome_brinquedo);
    $("#caracteristicas_edicao").val(caracteristicas);
    $("#valor_edicao").val(valor_brinquedo);
    $("#quantidade_edicao").val(quantidade);
    $("#observacao_edicao").val(observacao);
}

//pergunta quais os eventos que serão alterados com a exclusão do brinquedo
function listarEventosDoBrinquedoExcluido(id_brinquedo){
    socket.emit("meDaOsEventosAi", id_brinquedo, perfil);
}

function preencharJanelaExclusaoBrinquedo(id_brinquedo){
    document.getElementById("id_brinquedo_excluir").value = id_brinquedo;
    socket.emit("meDaOsEventosAi", id_brinquedo, perfil);//a resposta vem no escutasSocketIO => mandarEssesEventos
}

//função que envia ao servidor a requisição para envio da lista de clientes disponível no bd
//usada em: listarClientes.ejs, inserirEvento.ejs
function solicitarListaClientes(){
    //caso o campo nome_cliente tenha mais de dois caracteres, é feita a busca no bd, caso contrário a lista é mantida vazia.
    let nomeCliente = document.getElementById("nome_cliente").value;
    if(nomeCliente.length > 2){
        if ($("#listaClientes").parent().attr('id') == 'formulario_listagem_evento'){ //oção utilizada na tela de listagem de eventos
            let filtroDeBuscaEventos = {nomeCliente: cliente.id_cliente}; //filtro de busca é o objeto que contém os itens como nome de cliente e data para buscar eventos no bd
            
            socket.emit(filtroDeBuscaEventos, perfil);       
            return ('<input type="button" id="btnInserirClienteNoEvento" name="btn_inserir_cliente" id_cliente="'+cliente.id_cliente+'"'+
            ' class="btn btn-default" value="Inserir" onclick="inserirClienteNoEvento(this)">');
        }else {                  
            socket.emit("listaClientesPorNome", nomeCliente, perfil);
        }
    }else{
        document.getElementById("listaClientes").innerHTML = '';
    }
}

//#################FUNÇÕES DE EVENTOS ########################### 

//Callback responsável por preencher a lista de eventos solicitada via filtro.
/*listaDeEventos = socket.on("receberEventos", function(eventos){
    let listaDeEventos = '';
    listaEventosGlobal = eventos;
    eventos.forEach( evento => {
        let brinquedos = '';
        //if para o caso da lista de brinquedos vir vazia
        if(evento.brinquedos != undefined && evento.brinquedos.length > 0){
            let tamanho = evento.brinquedos.length;
            evento.brinquedos.forEach(function(brinquedo, indice){
                brinquedos += brinquedo;
                if(indice == tamanho-1){
                    brinquedos += '.';
                }else{
                    brinquedos += ', '
                }                 
            });                        
        }
        let dataParaExibir = evento.data.substring(0,10);
        dataParaExibir = dataParaExibir.split("-");
        let dia = dataParaExibir[2];
        let mes = dataParaExibir[1];
        let ano = dataParaExibir[0];
        let horaParaExibir = evento.data.substring(11,16);
       //montagem da lista de eventos a ser exibida na listagem de eventos
        /*let data = new Date(evento.data);
        let dataParaExibir = (Number(data.getDate())) + '/' + (Number(data.getMonth())+1) + '/' + data.getFullYear();   
        let horaParaExibir = Number(data.getHours())+":"+Number(data.getMinutes());  */   
        /*listaDeEventos += '<div id="cliente_individual" style="margin-top: 30px; margin-left: auto; margin-right: auto; width: max-content;">' +
                          'Data do Evento: ' + dia+'/'+mes+'/'+ano + '   | Hora do Evento: ' + horaParaExibir + '<br>' +
                          'Nome do Cliente: ' + evento.nome + '   Telefone: ' + evento.telefone + '   Telefone para recado: ' + evento.telefone_recado + '<br>' +
                          'Endereço do Evento: ' + evento.logradouro +'&nbsp;&nbsp;' + evento.numero + ',&nbsp;&nbsp;';
                          if(evento.complemento)
                              listaDeEventos += evento.complemento+', &nbsp;&nbsp;';                    
                          if(evento.observacao_endereco)
                              listaDeEventos += evento.observacao_endereco;
                          listaDeEventos += '<br>Cidade: '+ evento.cidade + '<br>' +
                          'Brinquedos: <br>' + brinquedos + '<br>' +
                          'Valor a receber no ato da montagem: ' + evento.valorLiquido + '<br>' +
                          '<button class="btn btn-default" id="btnEditarEvento"  data-toggle="modal" '+ 
                          'data-target="#janelaDeEdicaoEvento" value="'+evento.id_evento+'" onclick="preencherJanelaDeEdicaoDoEvento('+evento.id_evento+')">Editar</button>&nbsp;&nbsp;'+
                          '<button class="btn btn-default" id="btn_excluir_evento" data-toggle="modal"'+
                          'data-target="#janelaDeRemocaoEvento" onclick="setarIdAExcluir('+ evento.id_evento +')">Excluir</button>';
    });

    document.getElementById('listaEventos').innerHTML = listaDeEventos;
});*/

function setarIdAExcluir(idEvento){
    document.getElementById("form-excluir-evento").action = "/removerEvento/"+idEvento;
}

//função que faz a troca dos campos dentro da div "espacoNomeCliente", recolocando o texto e o input text que existia ao carregamento da página
function trocarCliente(){
    
    let campoInserirCliente = '<label for="nome_cliente">Nome do Cliente</label>' +
                            '<input type="text" class="form-control" name="nome_cliente" id="nome_cliente" onkeyup="solicitarListaClientes()">';
    document.getElementById("espacoNomeCliente").innerHTML = campoInserirCliente;
}

//responsável pelo controle do botão que aparece dinâmicamente em cada cliente disponível para escolha
//o envio do id do cliente via post foi feito colocando um input type text oculto abaixo do botão "trocar cliente";
function inserirClienteNoEvento(botao){
    let paiBotao = botao.parentElement;//verifica o nome do elemento pai do botão inserir 
    let clienteSelecionado = {};
    clientesGlobal.forEach((cliente) => {
        if (String(cliente.id_cliente) == paiBotao.childNodes[1].innerText){//o item 1 da div que contém o id do cliente
            clienteSelecionado = cliente;
            return;
        }
    });
    let nomeClienteSelecionado = clienteSelecionado.nome;   
    let dadosDoClienteSelecionado = "Cliente Selecionado: "+ nomeClienteSelecionado + ", id: " + botao.getAttribute("id_cliente");
    document.getElementById("espacoNomeCliente").value = dadosDoClienteSelecionado;
    document.getElementById("logradouro_evento").value = clienteSelecionado.logradouro;
    document.getElementById("numero").value = clienteSelecionado.numero;
    document.getElementById("complemento").value = clienteSelecionado.complemento;
    document.getElementById("bairro_evento").value = clienteSelecionado.bairro;
    document.getElementById("cidade_evento").value = clienteSelecionado.cidade;
    document.getElementById("listaClientes").innerHTML = '';
    document.getElementById("idClienteEscolhido").value = botao.getAttribute("id_cliente");
    $("#fecharModalCliente").trigger("click");
}


//inserção dos brinquedos no evento
function inserirBrinquedosNoEvento(){
    if (document.getElementById('data').value == ''){
        
    }
    socket.emit("enviarBrinquedosDisponiveis", document.getElementById("data").value, perfil);
    socket.on("receberBrinquedosDisponiveis", function(brinquedos){
        let listaBrinquedos = '<h1>Lista de brinquedos</h1>';

        brinquedos.forEach(brinquedo => {
            listaBrinquedos += '<div class="col-md-4" style="margin-top: 30px; margin-left: auto; margin-right: auto; height: 300px;">' +            
                                    '<div style="width: 200px;">' +
                                        '<img src="'+ caminho_imagens_brinquedos+"/"+removeAcento(brinquedo.nome_brinquedo)+"/miniatura/miniatura_"+brinquedo.foto_brinquedo +'" width="200px" >' +
                                    '</div>' +
                                    brinquedo.nome_brinquedo +
                               '</div>';
        });
        listaBrinquedos += '<input type="button" class="btn btn-default">';
        document.getElementById("espaco_lista_brinquedos").innerHTML = listaBrinquedos;
    });
}

 // A busca é via socketIO é somente solicitada caso existam mais de dois caracteres no input #nome_cliente_tela_evento e ou exista uma data definida para o evento
function filtrarEventos(){
    let criteriosDeBusca;
    criteriosDeBusca = {nomeCliente: document.getElementById("nome_cliente_tela_evento").value,
                        dataEvento: document.getElementById("dataEvento").value};
    if (((criteriosDeBusca.dataEvento == undefined) && (criteriosDeBusca.nomeCliente.length > 2)) || (criteriosDeBusca.dataEvento != undefined)) {   
        //console.log("solicitou busca via socketio, data: "  + criteriosDeBusca.dataEvento + document.getElementById("dataEvento").value + ", cliente: " + criteriosDeBusca.nomeCliente);       
        socket.emit("listaEventos", criteriosDeBusca, perfil);
    }
}

function preencherJanelaDeEdicaoDoEvento(id_evento){
    //limpa os checkbox de seleção dos brinquedos
    let listaCheckBoxBrinquedos = document.getElementsByClassName("checkbox-lista-brinquedos");
    for(let i = 0; i < listaCheckBoxBrinquedos.length; i++){
        listaCheckBoxBrinquedos[i].checked = false;
    }
      
    listaEventosGlobal.forEach(function(evento){        
        if(evento.id_evento == id_evento){
            let hora = moment(evento.data).format("HH:mm");
            let data = moment(evento.data).format("YYYY-MM-DD");
            document.getElementById("id_evento_edicao").value = evento.id_evento;
            document.getElementById("logradouro_edicao").value = evento.logradouro;
            document.getElementById("numero_edicao").value = evento.numero;
            document.getElementById("bairro_edicao").value = evento.bairro;
            document.getElementById("complemento_edicao").value = evento.complemento;
            document.getElementById("cidade_edicao").value = evento.cidade;
            document.getElementById("data_edicao").value = data;
            document.getElementById("hora_edicao").value = hora;
            document.getElementById("valor_total_edicao").value = evento.valor_total;
            document.getElementById("valor_desconto_edicao").value = evento.valor_desconto;
            document.getElementById("valor_sinal_edicao").value = evento.valor_sinal;
            document.getElementById("observacao_edicao").value = evento.observacao;
            document.getElementById("receber_no_ato_edicao").value = parseInt(evento.valor_total) - parseInt(evento.valor_sinal) - parseInt(evento.valor_desconto);
            if(evento.brinquedos){
                evento.brinquedos.forEach(function(brinquedo){
                    document.getElementById(brinquedo).checked = true;
                });
            }                       
        }
    });    
}

function enviarEmailConfirmacao(){
    let idEvento = document.getElementById("id_evento_edicao").value;
    let perfil = document.body.attributes.perfil.value;
    socket.emit("enviarEmailConfirmacao", idEvento, perfil);
}

//########################
//função que remove acentos que possam existir nos nomes que serão dados aos arquivos ou diretórios
function removeAcento(text){       
    text = text.toLowerCase();                                                         
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    return text;                 
}

function exibirMensagem(mensagem){
    let snackbar = document.getElementById("snackbar");
    snackbar.innerHTML = mensagem;
    snackbar.className = "show";
    setTimeout(function(){snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}

function editarBrinquedo(dados){
    $.ajax({
      type: "POST",
      url: "/editarBrinquedo",
      data: dados,
      cache: false,
      contentType: false,
      processData: false,
      success: function(resposta){
        if(resposta.status){
          exibirMensagem("Brinquedo Editado com Sucesso");
        }else{
          exibirMensagem("Ocorreu um erro na edição do brinquedo");
        }
        $("#janelaDeEdicaoBrinquedo").modal("hide");
        location.reload();
      }
    });
    return false;
  }
