const mysql = require("mysql"),
    moment = require("moment");

class Db{
    
    constructor(perfil){
        if(perfil){
            this.esquemaConexao = require("../../perfis/"+perfil+"/conexaoDb");
        }/*else{
            this.esquemaConexao = require("../Model/perfis/play_litoral/conexaoDb");
        }*/
        
        this.connection = mysql.createConnection(this.esquemaConexao);
        this.connection.connect(function(err){
            if(err){
                console.log("Deu erro!");
                console.log(err);
            }else{
            }
        });
    }

    selectTodosBrinquedos(){
        let sql = 'SELECT * FROM brinquedo';            
        var db = this;
        //devido à falta de sincronismo entre o tempo de execução do código e o retorno do db, foi necessário retornar uma "Promise" para tornar
        //possível o uso da função "await" na função que aguarda o retorno desse método.
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, function (err, results, fields) {
                db.connection.end();
                if (err) {
                    return resolve({status: false,
                                    resultado: err});
                }
                return resolve({status: true,
                                resultado: results});
            });
        });
    }

    selectUmBrinquedo(nomeBrinquedo){
        nomeBrinquedo += '%';
        let sql = 'SELECT * FROM brinquedo WHERE brinquedo.nome_brinquedo LIKE ?';
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, nomeBrinquedo, function (err, results, fields) {
                db.connection.end();
            if (err) return reject(err);
            return resolve(results);
            });
        });        
    }

    selectTodosClientes(){        
        let sql = 'SELECT * FROM cliente';
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, function (err, results, fields) {
                db.connection.end();
            if (err) return reject(err);            
            return resolve(results);
            });
        });          
    }

    selectUmCliente(cliente){        
        let grupoDeBusca = "'%" + cliente.nome + 
            "%' AND cliente.logradouro like '%" + cliente.logradouro +
            "%' AND cliente.cidade like '%" + cliente.cidade + "%'";
        let sql = 'SELECT cliente.id_cliente, cliente.nome, cliente.cpf, cliente.logradouro, cliente.numero, '+
                'cliente.complemento, cliente.observacao_endereco, cliente.bairro, cliente.cidade, '+
                'cliente.telefone, cliente.telefone_recado, cliente.email, cliente.observacao_cliente '+
                    'FROM cliente WHERE cliente.nome LIKE ';
        if(cliente.data){
            if(cliente.data.length > 0){
                grupoDeBusca = "'%" + cliente.nome + 
                "%' AND cliente.logradouro like '%" + cliente.logradouro +
                "%' AND cliente.cidade like '%" + cliente.cidade + "%'"+ " AND evento.data LIKE '"+cliente.data+"%'";           
                sql = 'SELECT cliente.id_cliente, cliente.nome, cliente.cpf, cliente.logradouro, cliente.numero, '+
                    'cliente.complemento, cliente.observacao_endereco, cliente.bairro, cliente.cidade, '+
                    'cliente.telefone, cliente.telefone_recado, cliente.email, cliente.observacao_cliente '+
                        'FROM cliente JOIN evento ON cliente.id_cliente = evento.id_cliente '+
                        'WHERE cliente.nome LIKE ';
            }
        }
        
        sql += grupoDeBusca;
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, function (err, results, fields) {
                db.connection.end();
                if (err) {
                    return resolve({status: false,
                                    resultado: err});
                }
                return resolve({status: true,
                                resultado: results});
            });
        });          
    }
    
    selectUmEvento(idEvento){
        var db = this;
        let sql = 'SELECT * FROM evento WHERE evento.id_evento = ?';
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, idEvento, function (err, results, fields) {   
                db.connection.end();             
                if (err) {
                    return resolve({status: false,
                                    resultado: err});
                }
                return resolve({status: true,
                                resultado: results});
            });
        });
    }

    selectTodosEventos(){
        var db = this;
        let sql = 'SELECT evento.*, cliente.nome, cliente.id_cliente, cliente.telefone, '+
        'cliente.telefone_recado FROM evento JOIN cliente ' +
        'ON evento.id_cliente = cliente.id_cliente';
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, function (err, results, fields) {   
                db.connection.end();             
                if (err) {
                    return resolve({status: false,
                                    resultado: err});
                }
                return resolve({status: true,
                                resultado: results});
            });
        });
    }

    excluirCliente(idCliente){
        let sql = "DELETE FROM cliente WHERE id_cliente = ?";
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, idCliente, function (err, results, fields) {
                db.connection.end();                
                if (err) return resolve({status: false,
                    resultado: err});
                return resolve({status: true,
                    resultado: results});
            });
        });
    }

    excluirEventosPorIdCliente(idCliente){
        let sql = "DELETE FROM evento WHERE id_cliente = ?";
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, idCliente, function (err, results, fields) {
                db.connection.end();                
                if (err) return resolve({status: false,
                    resultado: err});
                return resolve({status: true,
                    resultado: results});
            });
        });
    }

    excluirEvento(idEvento){
        let sql = "DELETE FROM evento WHERE id_evento = ?";
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, idEvento, function (err, results, fields) {
                db.connection.end();                
                if (err) return resolve({status: false,
                    resultado: err});
                return resolve({status: true,
                    resultado: results});
            });
        });
    }

    selectEventoPorIdCliente(idCliente){
        let sql = "SELECT * FROM evento JOIN cliente ON evento.id_cliente = cliente.id_cliente " +
        " WHERE evento.id_cliente = ?";
        var db = this;
        return new Promise(function(resolve, reject){
            db.connection.query(sql, idCliente, function(err, results, fields){
                db.connection.end();
                if (err) return resolve({status: false,
                    resultado: err});
                return resolve({status: true,
                    resultado: results});
            });
        });
    }

    selectPorDataEvento(cliente){
        let sql = "SELECT * FROM cliente JOIN evento " +
                    "ON cliente.id_cliente = evento.id_cliente " +
                    "WHERE evento.data BETWEEN '" + cliente.data + " 00:00:00' AND '" + cliente.data + " 23:59:59' AND " +
                    "cliente.nome LIKE '%" + cliente.nome + "%' AND " +
                    "cliente.logradouro LIKE '%" + cliente.logradouro + "%' AND " +
                    "cliente.cidade LIKE '%" + cliente.cidade + "%'";
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, function (err, results, fields) {
                db.connection.end();
                if (err) return reject(err);
                return resolve(results);
            });
        }); 
    }

    selectEventosPorCliente(idCliente){        
        let sql = 'SELECT * FROM evento WHERE evento.id_cliente = ?';
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, idCliente, function (err, results, fields) {
                db.connection.end();
                if (err) return reject(err);
                return resolve(results);
            });
        });          
    }

    mostrarBrinquedosNoEvento(idEvento){
        var db = this;
        let sql = 'SELECT brinquedo.nome_brinquedo, evento_brinquedo.evento FROM brinquedo JOIN evento_brinquedo ON brinquedo.id_brinquedo = evento_brinquedo.brinquedo WHERE evento = ?';
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, idEvento, function (err, results, fields) {
                db.connection.end();
                if (err) return reject(err);
                return resolve(results);
            });
        }); 
    }

    selectIdsBrinquedosPorIdEventos(idEvento){
        var db = this;
        let sql = 'SELECT brinquedo FROM evento_brinquedo WHERE evento = ?';
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, idEvento, function (err, results, fields) {
                db.connection.end();
                if (err) return resolve({status: false,
                    resultado: err});
                return resolve({status: true,
                    resultado: results});
            });
        }); 
    }

    selectBrinquedosNoEventoPorNomeCliente(nomeCliente){
        nomeCliente += '%';
        var db = this;
        let sql = 'SELECT evento.id_evento, brinquedo.nome_brinquedo FROM brinquedo ' +
        'JOIN evento_brinquedo ON brinquedo.id_brinquedo = evento_brinquedo.brinquedo ' +
        'JOIN evento ON evento_brinquedo.evento = evento.id_evento ' +
        'JOIN cliente ON evento.id_cliente = cliente.id_cliente ' +
        'WHERE cliente.nome LIKE ?';
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, nomeCliente, function (err, results, fields) {
                db.connection.end();
                if (err) return resolve({status: false,
                    resultado: err});
                return resolve({status: true,
                    resultado: results});
            });
        });
    }

    selectBrinquedosNoEventoPorData(data){
        var db = this;
        let sql = 'SELECT evento.id_evento, brinquedo.nome_brinquedo FROM brinquedo ' +
        'JOIN evento_brinquedo ON brinquedo.id_brinquedo = evento_brinquedo.brinquedo ' +
        'JOIN evento ON evento_brinquedo.evento = evento.id_evento ' +
        'WHERE evento.data = ?';
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, data, function (err, results, fields) {
                db.connection.end();
                if (err) return resolve({status: false,
                    resultado: err});
                return resolve({status: true,
                    resultado: results});
            });
        });
    }

    selectEventosPorData(data){
        var db = this;
        let sql = 'SELECT evento.*, cliente.nome, cliente.telefone, cliente.telefone_recado ' +
            'FROM evento ' +
            'JOIN cliente ON evento.id_cliente = cliente.id_cliente '+
            'WHERE DATE(evento.data) = ?';
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, data, function (err, results, fields) {
                db.connection.end();
                if (err) {
                    return resolve({status: false,
                                    resultado: err});
                }
                return resolve({status: true,
                                resultado: results});
            });
        });
    }

    selectEventosPorNomeCliente(nomeCliente){
        nomeCliente += '%';
        //let sql = 'select evento.*, cliente.nome, cliente.telefone from evento join cliente on evento.id_cliente = cliente.id_cliente where cliente.nome like ?';
        let sql = 'SELECT evento.*, cliente.nome, cliente.telefone, cliente.telefone_recado ' +
                    'FROM evento ' +
                    'JOIN cliente ON evento.id_cliente = cliente.id_cliente '+
                    'WHERE cliente.nome LIKE ?';
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, nomeCliente, function (err, results, fields) {
                db.connection.end();
                if (err) {
                    return resolve({status: false,
                                    resultado: err});
                }
                return resolve({status: true,                    
                                resultado: results});
            });
        });    
    }
    selectBrinquedosNoEventoPorNomeClienteEData(nomeCliente, data){
        if(moment(data).isValid()){
            data = moment(data).format("YYYY-MM-DD");
        }      
        let itensDeBusca = "('"+nomeCliente+"%') AND evento.data LIKE '"+data+"%';";
        let sql = 'SELECT evento.id_evento, brinquedo.nome_brinquedo FROM brinquedo ' +
            'JOIN evento_brinquedo ON brinquedo.id_brinquedo = evento_brinquedo.brinquedo ' +
            'JOIN evento ON evento_brinquedo.evento = evento.id_evento ' +
            'JOIN cliente ON evento.id_cliente = cliente.id_cliente ' +
            'WHERE cliente.nome LIKE '+ itensDeBusca;
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, function (err, results, fields) {
                db.connection.end();
                if (err) {
                    return resolve({status: false,
                                    resultado: err});
                }
                return resolve({status: true,
                                resultado: results});
            });
        });    
    }

    selectEventosPorClienteEData(nomeCliente, data){
        let dataParaQuery = '';
        if(moment(data).isValid()){
            dataParaQuery = moment(data).format("YYYY-MM-DD");
        }
        let itensDeBusca = "('"+nomeCliente+"%') AND evento.data LIKE '"+dataParaQuery+"%' "+
            "ORDER BY evento.data ASC;";        
        let sql = 'SELECT evento.*, cliente.nome, cliente.telefone, cliente.telefone_recado ' +
                    'FROM evento ' +
                    'JOIN cliente ON evento.id_cliente = cliente.id_cliente '+
                    'WHERE cliente.nome LIKE '+ itensDeBusca;
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, function (err, results, fields) {
                db.connection.end();
                if (err) {
                    return resolve({status: false,
                                    resultado: err});
                }
                return resolve({status: true,
                                resultado: results});
            });
        });    
    }

    inserirBrinquedo(brinquedo){
        let sql = 'INSERT INTO brinquedo SET ?';                     
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, brinquedo, function (err, results, fields) {
                db.connection.end();
            if (err) {
                return resolve({status: false,
                                resultado: err});
            }
            return resolve({status: true,
                            resultado: results});
            });
        });    
    }

    editarBrinquedo(brinquedo){
        let sql = "UPDATE brinquedo SET ? WHERE brinquedo.id_brinquedo = " + brinquedo.id_brinquedo;                     
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, brinquedo, function (err, results, fields) {
                db.connection.end();
            if (err) {
                return resolve({status: false,
                                resultado: err});
            }
            return resolve({status: true,
                            resultado: results});
            });
        });    
    }

    selectEventoPorIdBrinquedo(id_brinquedo){
        let sql = "SELECT * FROM evento "+
                    "JOIN evento_brinquedo ON evento.id_evento = evento_brinquedo.evento "+
                    "WHERE evento_brinquedo.brinquedo = ?";                     
        var db = this;        
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, id_brinquedo, function (err, results, fields) {
                db.connection.end();
            if (err) {
                return resolve({status: false,
                                resultado: err});
            }
            return resolve({status: true,
                            resultado: results});
            });
        });    
    }

    inserirCliente(cliente){
        let sql = 'INSERT INTO cliente SET ?';
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, cliente, function (err, results, fields) {
                db.connection.end();
            if (err) {
                return resolve({status: false,
                                resultado: err});
            }
            return resolve({status: true,
                            resultado: results});
            });
        });  
    }

    inserirDiversosClientes(clientes){

        let sql = 'INSERT INTO cliente (`nome`,`cpf`,`logradouro`,`numero`,`complemento`,`observacao_endereco`,`cidade`' +
                ',`telefone`,`telefone_recado`,`email`, `observacao_cliente`) VALUES ';
        clientes.forEach(function(cliente, indice) {
            sql += "('"+cliente.nome+"', '"+cliente.cpf+"', '"+cliente.logradouro+"', "+Number(cliente.numero)+", '"+
            cliente.complemento+"', '"+cliente.observacao_endereco+"', '"+cliente.cidade+"',  '"+cliente.telefone+"', '"+cliente.telefone_recado+"', '"+cliente.email+
            "', '"+cliente.observacao_cliente+"')";
            if(indice == clientes.length-1){
                sql += ";";
            }else {
                sql += ",";
            }
        });
        
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, function (err, results, fields) {
                db.connection.end();
            if (err) {
                return resolve({status: false,
                                resultado: err});
            }
            return resolve({status: true,
                            resultado: results});
            });
        });      
    }

    inserirDiversosEventos(eventos){
        
        let sql = 'INSERT INTO evento (`id_cliente`, `data`, `logradouro`, `numero`, `complemento`, `cidade`, `observacao`) VALUES ';
        eventos.forEach(function(evento, indice){
            //let dataArray = evento.data.split('/');
            //let data = (dataArray[2]+'-'+dataArray[1]+'-'+dataArray[0]);
            sql += "('"+evento.id_cliente+"', '"+evento.data+"', '"+evento.logradouro+"', '"+evento.numero+"', '"+evento.complemento+"', '"+evento.cidade+"', '"+
            evento.observacao+"')";
            if(indice == eventos.length-1){
                sql += ";";
            }else {
                sql += ",";
            }            
        });
        
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, function (err, results, fields) {
                db.connection.end();
            if (err) {
                return resolve({status: false,
                                resultado: err});
            }
            return resolve({status: true,
                            resultado: results});
            });
        });   
        
    }
    //troquei o sistema de resposta, veririficar depois todos os querys que usam essa função
    inserirEvento(evento){
        let sql = 'INSERT INTO evento SET ?';
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, evento, function (err, results, fields) {
                db.connection.end();
            if (err) {
                return resolve({status: false,
                                resultado: err});
            }
            return resolve({status: true,
                            resultado: results});
            });
        });  
    }  

    inserirBrinquedoNoEvento(brinquedosEvento){
        /*
        recebo
        brinquedosEvento = {
            evento: id_evento,
            brinquedo: [id_brinquedo]
        }
        */
        console.log(brinquedosEvento);
        let sql = 'INSERT INTO evento_brinquedo (`brinquedo`, `evento`) VALUES';
        let valores = [];
        brinquedosEvento.brinquedos.forEach(brinquedo => {
            sql += " ('"+brinquedo+"', '"+brinquedosEvento.evento+"'),"
        });
        sql = sql.substring(0, (sql.length - 1));
        sql += ';';     
    
        var db = this;
        return new Promise(function (resolve, reject) {
            if(brinquedosEvento.brinquedos.length > 0){
                db.connection.query(sql, function (err, results, fields) {
                    db.connection.end();
                    if (err) {
                        return resolve({status: false,
                                        resultado: err});
                    }
                    return resolve({status: true,
                                    resultado: results});
                });
            }else{
                return resolve({
                    status: true
                })
            }            
        }); 
    }

    editarCliente(cliente){
        let sql = "UPDATE cliente SET ? WHERE cliente.id_cliente = " + cliente.id_cliente;
        var db = this;
        return new Promise(function (resolve){
            db.connection.query(sql, cliente, function(err, results, fields){
                db.connection.end();
                if (err) {
                    return resolve({status: false,
                                    resultado: err});
                }
                return resolve({status: true,
                                resultado: results});
            });
        });
    }

    editarEvento(evento){
        let sql = "UPDATE evento SET ? WHERE evento.id_evento = " + evento.id_evento;
        var db = this;
        return new Promise(function (resolve){
            db.connection.query(sql, evento, function(err, results, fields){
                db.connection.end();
                if (err) {
                    return resolve({status: false,
                                    resultado: err});
                }
                return resolve({status: true,
                                resultado: results});
            });
        });
    }

    selectBrinquedosPorIdEvento(id_evento){
        let sql = "SELECT brinquedo.id_brinquedo, brinquedo.nome_brinquedo, brinquedo.foto_brinquedo, "+
            "brinquedo.quantidade FROM brinquedo JOIN evento_brinquedo "+
            "ON evento_brinquedo.brinquedo = brinquedo.id_brinquedo "+
            "WHERE evento_brinquedo.evento = ?";
        var db = this;
        return new Promise(function(resolve){
            db.connection.query(sql, id_evento, function(err, result, fields){
                db.connection.end();
                if(err){
                    return resolve({status: false,
                                    resultado: err
                                    });
                }else{
                    return resolve({status: true,
                                    resultado: result
                                    });
                }
            });
        });
    }

    excluirBrinquedosEvento(id_evento){
        let sql = "DELETE FROM evento_brinquedo WHERE evento = ?";
        var db = this;
        return new Promise(function(resolve){
            db.connection.query(sql, id_evento, function(err, result, fields){
                db.connection.end();
                if(err){
                    return resolve({status: false,
                                    resultado: err
                                    });
                }else{
                    return resolve({status: true,
                                    resultado: result
                                    });
                }
            });
        });
    }

    excluirBrinquedosEventoPorIdBrinquedo(id_brinquedo){
        let sql = "DELETE FROM evento_brinquedo WHERE brinquedo = ?";
        var db = this;
        return new Promise(function(resolve){
            db.connection.query(sql, id_brinquedo, function(err, result, fields){
                
                if(err){
                    return resolve({status: false,
                                    resultado: err
                                    });
                }else{
                    return resolve({status: true,
                                    resultado: result
                                    });
                }
            });
        });
    }

    excluirBrinquedo(id_brinquedo){
        let sql = "DELETE FROM brinquedo WHERE id_brinquedo = ?";
        var db = this;
        return new Promise(function(resolve){
            db.connection.query(sql, id_brinquedo, function(err, result, fields){
                
                if(err){
                    return resolve({status: false,
                                    resultado: err
                                    });
                }else{
                    return resolve({status: true,
                                    resultado: result
                                    });
                }
            });
        });
    }

    selectClientePorIdEvento(idEvento){
        let sql = "SELECT * FROM cliente JOIN evento " +
                    "ON cliente.id_cliente = evento.id_cliente " +
                    "WHERE evento.id_evento = ?";
        var db = this;
        return new Promise(function(resolve){
            db.connection.query(sql, idEvento, function(err, result){
                db.connection.end();
                if(err){
                    return resolve({status: false,
                                    resultado: err
                                    });
                }else{
                    return resolve({status: true,
                                    resultado: result
                                    });
                }
            });
        });
    }

    inserirSessao(sessao){
        let sql = 'INSERT INTO sessao SET ?';        
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, sessao, function (err, results, fields) {
                db.connection.end();
                if (err) {
                    return resolve({status: false,
                                    resultado: err});
                }
                return resolve({status: true,
                                resultado: results});
            });
        }); 
    }

    selectSessoes(){
        let sql = "SELECT * FROM sessao";
        var db = this;
        return new Promise(function(resolve){
            db.connection.query(sql, function(err, result){
                db.connection.end();
                if(err){                    
                    return resolve({status: false,
                                    resultado: err
                                    });
                }
                return resolve({status: true,
                                resultado: result});                
            });
        });
    }

    deleteSessao(sessao){
        let sql = "DELETE FROM sessao WHERE sessao.evento = ?";
        var db = this;
        return new Promise(function(resolve){
            db.connection.query(sql, sessao, function(err, result){
                db.connection.end();
                if(err){
                    return resolve({status: false,
                                    resultado: err
                                    });
                }
                return resolve({status: true,
                                resultado: result});                
            });
        });
    }

    selectSessao(sessao){
        let sql = "SELECT * FROM sessao WHERE sessao.evento = ?";
        var db = this;
        return new Promise(function(resolve){
            db.connection.query(sql, sessao, function(err, result){
                //db.connection.end();
                if(err){
                    return resolve({status: false,
                                    resultado: err
                                    });
                }
                return resolve({status: true,
                                resultado: result});                
            });
        });
    }

    listarEventoClientePorIdBrinquedo(idBrinquedo){
        let sql = "SELECT evento.id_evento, evento.data, evento.logradouro, evento.numero, "+
        "evento.cidade, evento.status, cliente.nome, cliente.telefone FROM cliente "+
            "JOIN evento ON cliente.id_cliente = evento.id_cliente JOIN evento_brinquedo "+
                "ON evento.id_evento = evento_brinquedo.evento JOIN brinquedo "+
                "ON evento_brinquedo.brinquedo = brinquedo.id_brinquedo "+
                    "WHERE brinquedo.id_brinquedo = ?";
        var db = this;
        return new Promise(function(resolve){
            db.connection.query(sql, idBrinquedo, function(err, result){
                db.connection.end();
                if(err){
                    return resolve({status: false,
                                    resultado: err
                                    });
                }
                return resolve({status: true,
                                resultado: result});                
            });
        });
    }

    //########### MÉTODOS V2 ###########
    select_proximos_eventos(){
        /*
        let sql = "select id_evento, data_evento, logradouro_evento, numero_evento, complemento_evento, " +
        "observacao_endereco_evento, cidade_evento, valor_total, valor_desconto, valor_sinal, observacao_evento,  " +
        "bairro_evento, abrigo, id_cliente, nome_cliente, telefone, telefone_recado, email, logradouro_cliente, " +
        "numero_cliente, complemento_endereco_cliente, observacao_endereco_cliente, bairro_cliente, cidade_cliente, "+
        "group_concat(brinquedo) as brinquedos from  " +
        "(select evento.id_evento as id_evento, brinquedo.nome_brinquedo as brinquedo,  " +
        "evento.data as data_evento, evento.logradouro as logradouro_evento,  " +
        "evento.numero as numero_evento, evento.complemento as complemento_evento,  " +
        "evento.observacao as observacao_endereco_evento, evento.cidade as cidade_evento,  " +
        "evento.valor_total as valor_total, evento.valor_desconto as valor_desconto,  " +
        "evento.valor_sinal as valor_sinal, evento.observacao_evento as observacao_evento,  " +
        "evento.bairro as bairro_evento, evento.possui_local_abrigado as abrigo,  " +
        "cliente.id_cliente as id_cliente, cliente.nome as nome_cliente, cliente.telefone as telefone, " +
        "cliente.telefone_recado as telefone_recado, cliente.email as email,  " +
        "cliente.logradouro as logradouro_cliente, cliente.numero as numero_cliente, " + 
        "cliente.complemento as complemento_endereco_cliente, cliente.observacao_endereco as observacao_endereco_cliente, " + 
        "cliente.bairro as bairro_cliente, cliente.cidade as cidade_cliente " + 
        "from " +
        "cliente join evento on cliente.id_cliente = evento.id_cliente " +
        "left join evento_brinquedo " + //o left join foi colocado pois os eventos podem estar ainda sem brinquedos inseridos
        "on evento.id_evento = evento_brinquedo.evento  " +
        "left join brinquedo " +
        "on evento_brinquedo.brinquedo = brinquedo.id_brinquedo " +
        "where evento.data BETWEEN CURDATE() AND CURDATE() + INTERVAL 15 DAY ORDER BY evento.data ASC) " +
        "as tab group by id_evento order by data_evento asc; ";*/
        
        let busca_brinquedo = "'{\"id_brinquedo\":\"', brinquedo.id_brinquedo, '\", \"nome\":\"', brinquedo.nome_brinquedo, '\", \"imagem\":\"',brinquedo.foto_brinquedo,'\"}'),'')) ";
        let sql = "SELECT evento.bairro as bairro_evento, evento.cidade as cidade_evento, evento.complemento as complemento_evento, "+
            "evento.data as data_evento, evento.id_evento as id_evento, evento.logradouro as logradouro_evento, "+
            "evento.numero as numero_evento, evento.observacao as observacao_endereco_evento, evento.observacao_evento as observacao_evento, "+
            "evento.valor_desconto, evento.valor_sinal, evento.valor_total, evento.possui_local_abrigado as abrigo, evento.status,"+
            "cliente.bairro as bairro_cliente, cliente.cidade as cidade_cliente, cliente.complemento as complemento_endereco_cliente, "+
            "cliente.email, cliente.id_cliente, cliente.logradouro as logradouro_cliente, cliente.nome as nome_cliente, "+
            "cliente.numero as numero_cliente, cliente.observacao_endereco as observacao_endereco_cliente, cliente.telefone, cliente.telefone_recado, "+
            "group_concat(COALESCE(CONCAT(" +
            busca_brinquedo +
            "as brinquedos FROM brinquedo " +
            "right join evento_brinquedo on brinquedo.id_brinquedo = evento_brinquedo.brinquedo "+
            "right join evento on evento_brinquedo.evento = evento.id_evento "+
            "right join cliente on evento.id_cliente = cliente.id_cliente " +
            "where evento.data BETWEEN CURDATE() AND CURDATE() + INTERVAL 15 DAY "+ 
            "group by evento.id_evento "+
            "order by evento.data asc";
        var db = this;
        return new Promise(function(resolve){
            db.connection.query(sql, function(err, resultado){
                db.connection.end();
                if(err){
                    return resolve({
                        status: false,
                        resultado: err
                    });
                }else{
                    resultado.forEach(function(linha){
                        linha.brinquedos = "["+linha.brinquedos+"]";
                        linha.brinquedos = JSON.parse(linha.brinquedos);
                    });
                    return resolve({
                        status: true,
                        resultado: resultado
                    });
                } 
            });
        });
    }
    
    select_qtd_de_brinquedos(data){
        data = String(moment(data).format("YYYY-MM-DD"))+"%";
        let sql = "select brinquedo.*, qtd_alugada.* from brinquedo left join "+
        "(select count(*) as qtd_alugada, id_brinquedo_alugado "+
            "from (select evento_brinquedo.brinquedo as id_brinquedo_alugado, evento.id_evento as id_evento, evento.status as status "+
                "from evento join evento_brinquedo on evento.id_evento = evento_brinquedo.evento "+
                "where evento.data like ?) "+
            "as consulta group by id_brinquedo_alugado) "+
        "as qtd_alugada "+
        "on brinquedo.id_brinquedo = qtd_alugada.id_brinquedo_alugado";
        /*
        let sql = "select grupo.*, brinquedo.nome_brinquedo, brinquedo.foto_brinquedo, brinquedo.quantidade from "+
            "(select count(*) as qtd_alugada, id_brinquedo "+
                "from (select evento_brinquedo.brinquedo as id_brinquedo, evento.id_evento as id_evento "+
                    "from evento join evento_brinquedo "+
                "on evento.id_evento = evento_brinquedo.evento where evento.data like ?) as consulta "+
            "group by id_brinquedo) as grupo join brinquedo "+
        "on brinquedo.id_brinquedo = grupo.id_brinquedo";*/
        var db = this;
        return new Promise(function(resolve){
            db.connection.query(sql, data, function(err, result){
                db.connection.end();
                if(err){
                    return resolve({
                        status: false,
                        resultado: err
                    });
                }else{
                    return resolve({
                        status: true,
                        resultado: result
                    });
                } 
            });
        });
    }

    select_qtd_de_brinquedos_alugados_no_dia(data){
        data = String(moment(data).format("YYYY-MM-DD"))+"%";
        let sql = "select count(*) as quantidade_alugada, brinquedo_alugado from " +
                "(select evento_brinquedo.brinquedo as brinquedo_alugado, "+
                    "evento_brinquedo.evento as evento "+
                    "from brinquedo "+
                    "join evento_brinquedo "+
                    "on brinquedo.id_brinquedo = evento_brinquedo.brinquedo "+
                    "join evento "+
                    "on evento_brinquedo.evento = evento.id_evento "+
                    "where evento.data like ?" +
                    ") as filtro_brinquedos "+ 
                "group by brinquedo_alugado";
        var db = this;
        return new Promise(function(resolve){
            db.connection.query(sql, data, function(err, result){
                db.connection.end();
                if(err){
                    return resolve({
                        status: false,
                        resultado: err
                    });
                }else{
                    return resolve({
                        status: true,
                        resultado: result
                    });
                } 
            });
        });
    }

    excluir_brinquedos_de_determinado_evento(brinquedos, evento){
        let sql = '';
        var db = this;
        return new Promise(function(resolve){
            if(brinquedos.length > 0){
                let lista_brinquedos = "(";
                brinquedos.forEach(function(brinquedo, indice){
                    if(indice < brinquedos.length - 1){
                        lista_brinquedos += "brinquedo = "+String(brinquedo) + " OR "; 
                    }else{
                        lista_brinquedos += "brinquedo = "+String(brinquedo) + ")";
                    }
                });
                sql = "DELETE FROM evento_brinquedo WHERE evento = "+evento+" AND " + lista_brinquedos;
                db.connection.query(sql, function(err, result){
                    db.connection.end();
                    if(err){
                        return resolve({
                            status: false,
                            resultado: err
                        });
                    }else{
                        return resolve({
                            status: true,
                            resultado: result
                        });
                    } 
                });
            }else{
                return resolve({
                    status: true
                });
            }
        });
    }

    select_evento_por_intervalo_data(de, ate){
        let intervalo_de_busca = "";
        //caso alguma das datas venha vazia, o sistema tem que buscar por data única ao invés de um intervalo de datas
        if(de == ''){
            intervalo_de_busca = "like '" + ate + "%'";
        }else if(ate == ''){
            intervalo_de_busca = "like '" + de + "%'";
        }else{
            intervalo_de_busca = "between '" + de + "%' and '" + ate + " 23:59:59'";
        }        
        let busca_brinquedo = "'{\"id_brinquedo\":\"', brinquedo.id_brinquedo, '\", \"nome\":\"', brinquedo.nome_brinquedo, '\", \"imagem\":\"',brinquedo.foto_brinquedo,'\"}'),'')) ";
        let sql = "SELECT evento.bairro as bairro_evento, evento.cidade as cidade_evento, evento.complemento as complemento_evento, "+
            "evento.data as data_evento, evento.id_evento as id_evento, evento.logradouro as logradouro_evento, "+
            "evento.numero as numero_evento, evento.observacao as observacao_endereco_evento, evento.observacao_evento as observacao_evento, "+
            "evento.valor_desconto, evento.valor_sinal, evento.valor_total, evento.possui_local_abrigado as abrigo, evento.status,"+
            "cliente.bairro as bairro_cliente, cliente.cidade as cidade_cliente, cliente.complemento as complemento_endereco_cliente, "+
            "cliente.email, cliente.id_cliente, cliente.logradouro as logradouro_cliente, cliente.nome as nome_cliente, "+
            "cliente.numero as numero_cliente, cliente.observacao_endereco as observacao_endereco_cliente, cliente.telefone, cliente.telefone_recado, "+
            "group_concat(COALESCE(CONCAT(" +
            busca_brinquedo +
            "as brinquedos FROM brinquedo " +
            "right join evento_brinquedo on brinquedo.id_brinquedo = evento_brinquedo.brinquedo "+
            "right join evento on evento_brinquedo.evento = evento.id_evento "+
            "right join cliente on evento.id_cliente = cliente.id_cliente " +
            "where evento.data "+ intervalo_de_busca + 
            "group by evento.id_evento "+
            "order by evento.data asc";
        var db = this;
        return new Promise(function(resolve){
            db.connection.query(sql, function(err, resultado){
                db.connection.end();
                if(err){
                    console.log(err);
                    return resolve({
                        status: false,
                        resultado: err
                    });
                }else{
                    resultado.forEach(function(linha){
                        linha.brinquedos = "["+linha.brinquedos+"]";
                        linha.brinquedos = JSON.parse(linha.brinquedos);
                    });                   
                    return resolve({
                        status: true,
                        resultado: resultado
                    });
                } 
            });
        });
    }

    select_nome_imagem_brinquedo(id_brinquedo){
        console.log(id_brinquedo);
        let db = this;
        let sql = "SELECT nome_brinquedo, foto_brinquedo FROM brinquedo WHERE brinquedo.id_brinquedo = ?";
        return new Promise(function(resolve){
            db.connection.query(sql, id_brinquedo, function(err, resultado){  
                db.connection.end();  
                if(err){
                    console.log(err);
                    return resolve({
                        status: false,
                        resultado: err
                    });
                }else{
                    return resolve({
                        status: true,
                        resultado: resultado
                    });
                }
            });
        });
    }
}

module.exports = Db;





