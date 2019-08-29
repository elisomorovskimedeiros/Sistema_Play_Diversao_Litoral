//################# FUNÇÕES DOS BRINQUEDOS #####################
var perfil;
//preencher a tela de edição dos brinquedos
function preencherModalEdicao(id_brinquedo,nome_brinquedo,caracteristicas,valor_brinquedo,quantidade,observacao){
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
$(document).ready(function(){ 
    perfil = $("body").attr("perfil");
    //recebe a lista de eventos alterados com a exclusão do brinquedo
    socket.on("mandarEssesEventos", function(listaEventos){
        let lista = listaEventos.resultado;
        console.log(lista[0].data);
          
        let eventos = "";
        lista.forEach(function(evento){
            let data = new Date(evento.data);
            let dataParaExibir = (Number(data.getDate())) + '/' + (Number(data.getMonth())+1) + '/' + data.getFullYear();   
            let horaParaExibir = Number(data.getHours())+":"+Number(data.getMinutes()); 
            eventos += '<div id="cliente_individual" style="margin-top: 30px; margin-left: auto; margin-right: auto; width: max-content;">' +
                          'Data do Evento: ' + dataParaExibir + '   | Hora do Evento: ' + horaParaExibir + '<br>' +
                          'Nome do Cliente: ' + evento.nome + '   Telefone: ' + evento.telefone + '   Telefone para recado: ' + evento.telefone_recado + '<br>' +
                          'Endereço do Evento: ' + evento.logradouro +'&nbsp;&nbsp;' + evento.numero + ',&nbsp;&nbsp;';
                          if(evento.complemento)
                              eventos += evento.complemento+', &nbsp;&nbsp;';                    
                          if(evento.observacao_endereco)
                              eventos += evento.observacao_endereco;
                          eventos += '<br>Cidade: '+ evento.cidade + '<br>' +
                          'Brinquedos: <br>' + evento.brinquedos + '<br>'
                          'Valor a receber no ato da montagem: ' + evento.valorLiquido;
        });
        $("#listaBrinquedos").wrapInner(eventos);
        //$("#listaEventos").wrapInner(eventos);    
    });

    $("#nome_brinquedo").keyup(function(){
        //caso o campo nome_brinquedo tenha mais de dois caracteres, é feita a busca no bd, caso contrário a lista é mantida vazia.
        //essa função é utilizada pela página listarBrinquedos
        if($("#nome_brinquedo").val().length > 2){
            socket.emit("listaBrinquedosPorNome",$("#nome_brinquedo").val(), perfil);
        }else{
            document.getElementById("listaBrinquedos").innerHTML = '';
        }
    });


    //função que recebe a consulta da lista de brinquedos no bd, conforme o filtro solicitado
        //essa função é utilizada pela página listarBrinquedos
        
        socket.on("mandarBrinquedos", function(brinquedos){
            let listaBrinquedos = '';
            //preenchimento da lista de clientes filtrada na variável listaClientes
            brinquedos.forEach(brinquedo => {
                listaBrinquedos += 
                '<div class="col-md-4" style="margin-top: 30px; margin-left: auto; margin-right: auto; height: max-content; width: max-content;">' +
                    '<div style="width: 200px;">'+
                        '<img src="'+brinquedo.foto_brinquedo+'" width="200px" >' +
                    '</div>'+
                    'Id do Brinquedo: '+ brinquedo.id_brinquedo +'<br>' +
                    'Nome: '+ brinquedo.nome_brinquedo +' <br>' +
                    'Características: '+ brinquedo.caracteristicas +'<br>' +
                    'Valor da locação: '+ brinquedo.valor_brinquedo + '<br>' +
                    'Quantidade em Estoque:' + brinquedo.quantidade + '<br>';
                    if(brinquedo.observacao)
                        listaBrinquedos += 'Observação: ' + brinquedo.observacao + '<br>';
                    listaBrinquedos +=
                    '<div>' +
                        '<button class="btn btn-primary" id="btnEditarBrinquedo"  data-toggle="modal" '+ 
                        'data-target="#janelaDeEdicaoBrinquedo" value="'+brinquedo.id_brinquedo+'">Editar</button>&nbsp;&nbsp;'+
                        '<button class="btn btn-danger" id="btn_excluir_brinquedo" data-toggle="modal"'+
                        'data-target="#janelaDeRemocaoBrinquedo" onclick="removerBrinquedo('+ brinquedo.id_brinquedo +')">Excluir</button>'+
                    '</div>'+
                '</div>';
            }); 
            //envio das informações para a página
            document.getElementById("listaBrinquedos").innerHTML = "";
            document.getElementById("listaBrinquedos").innerHTML = listaBrinquedos;     
        });
        

        $('#form-editar-brinquedo').submit(function(){
            var dados = $( this ).serialize();
    
            $.ajax({
                type: "POST",
                url: "/editarBrinquedo",
                data: dados,
                success: function( data )
                {
                    $("#fecharModalExcluir").trigger("click");
                    if(data.errno){
                        alert("Ocorreu um erro na edição");
                        console.log(data.sqlMessage);
                        console.log(data.sql);
                    }else{
                        alert("Edição Ok!!");
                    }                    
                    window.location.href = "/listarTodosBrinquedos";//lista todos os brinquedos novamente       
                }
            });
    
            return false;
        });     
        
    });