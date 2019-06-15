const mysql = require("mysql"),
    Brinquedo = require("../Model/Brinquedo"),
    Cliente = require("../Model/Cliente"),
    Evento = require("../Model/Evento");

class Db{
    constructor(){
        this.connection = mysql.createConnection({
            host     : 'mysql10-farm76.kinghost.net',
            user     : 'solevento_add1',
            password : 'Medeiros15',
            database : 'solevento', //não colocar se for criar um banco através do node
            //multipleStatements: true //cuidado: deve ser falso (padrão) para evitar sql injection - com ele true testar a rota: http://localhost:3000/post/1;DROP%20TABLE%20posts
        });
        this.connection.connect(function(err){
            if(err){
                console.log("Deu erro!linha 20");
                console.log(err);
            }else{
                console.log("Conectado com o BD!");
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
            if (err) return reject(err);
            return resolve(results);
            });
        });
    }

    selectUmBrinquedo(nomeBrinquedo){
        nomeBrinquedo += '%';
        let sql = 'SELECT * FROM brinquedo WHERE brinquedo.nome_brinquedo LIKE ?';
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, nomeBrinquedo, function (err, results, fields) {
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
            if (err) return reject(err);            
            return resolve(results);
            });
        });          
    }

    selectUmCliente(nomeCliente){
        nomeCliente += '%';
        let sql = 'SELECT * FROM cliente WHERE cliente.nome LIKE ?';
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, nomeCliente, function (err, results, fields) {
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
                if (err) return reject(err);
                return resolve(results);
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
                if (err) return reject(err);
                return resolve(results);
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
                if (err) return reject(err);
                return resolve(results);
            });
        });
    }

    selectEventosPorData(data){
        var db = this;
        let sql = 'SELECT evento.id_evento, evento.data, cliente.nome, cliente.telefone, cliente.telefone_recado, evento.logradouro, ' +
            'evento.numero, evento.observacao, evento.complemento, evento.cidade, evento.observacao_evento ' +
            'FROM evento ' +
            'JOIN cliente ON evento.id_cliente = cliente.id_cliente '+
            'WHERE evento.data = ?';
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, data, function (err, results, fields) {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    }

    selectEventosPorNomeCliente(nomeCliente){
        nomeCliente += '%';
        let sql = 'SELECT evento.id_evento, evento.data, cliente.nome, cliente.telefone, cliente.telefone_recado, evento.logradouro, ' +
                    'evento.numero, evento.observacao, evento.complemento, evento.cidade, evento.observacao_evento ' +
                    'FROM evento ' +
                    'JOIN cliente ON evento.id_cliente = cliente.id_cliente '+
                    'WHERE cliente.nome LIKE ?';
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, nomeCliente, function (err, results, fields) {
                if (err) return reject(err);
                return resolve(results);
            });
        });    
    }
    selectBrinquedosNoEventoPorNomeClienteEData(nomeCliente, data){
        data = new Date(data);
        data.setDate(data.getDate()+1);
        let horaInicio = " 00:00:00",
        horaFim = " 23:59:59"; 
        let dataParaQuery = String(data.getFullYear()+"-"+(Number(data.getMonth())+1)+"-"+data.getDate());
        let itensDeBusca = "('"+nomeCliente+"%') AND evento.data BETWEEN '"+dataParaQuery+horaInicio+"' AND '"+dataParaQuery+horaFim+"';";         
        let sql = 'SELECT evento.id_evento, brinquedo.nome_brinquedo FROM brinquedo ' +
            'JOIN evento_brinquedo ON brinquedo.id_brinquedo = evento_brinquedo.brinquedo ' +
            'JOIN evento ON evento_brinquedo.evento = evento.id_evento ' +
            'JOIN cliente ON evento.id_cliente = cliente.id_cliente ' +
            'WHERE cliente.nome LIKE '+ itensDeBusca;
        console.log(sql);
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, nomeCliente, function (err, results, fields) {
                console.log(results);
                if (err) return reject(err);
                return resolve(results);
            });
        });    
    }

    selectEventosPorClienteEData(nomeCliente, data){
        data = new Date(data);
        data.setDate(data.getDate()+1);
        let horaInicio = " 00:00:00",
            horaFim = " 23:59:59"; 
        let dataParaQuery = String(data.getFullYear()+"-"+(Number(data.getMonth())+1)+"-"+data.getDate());
        let itensDeBusca = "('"+nomeCliente+"%') AND evento.data BETWEEN '"+dataParaQuery+horaInicio+"' AND '"+dataParaQuery+horaFim+"';";        
        let sql = 'SELECT evento.id_evento, evento.data, cliente.nome, cliente.telefone, cliente.telefone_recado, evento.logradouro, ' +
                    'evento.numero, evento.observacao, evento.complemento, evento.cidade, evento.observacao_evento ' +
                    'FROM evento ' +
                    'JOIN cliente ON evento.id_cliente = cliente.id_cliente '+
                    'WHERE cliente.nome LIKE '+ itensDeBusca;
        var db = this;
        console.log("primeira query");
        console.log(sql);
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, function (err, results, fields) {
                if (err) return reject(err);
                console.log(results);                
                return resolve(results);
            });
        });    
    }

    inserirBrinquedo(brinquedo){
        let sql = 'INSERT INTO play.brinquedo SET ?';                     
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, brinquedo, function (err, results, fields) {
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
        let sql = 'INSERT INTO play.cliente SET ?';
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, cliente, function (err, results, fields) {
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

        let sql = 'INSERT INTO play.cliente (`nome`,`cpf`,`logradouro`,`numero`,`complemento`,`observacao_endereco`,`cidade`' +
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
        //console.log(sql);
        
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, function (err, results, fields) {
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
        
        let sql = 'INSERT INTO play.evento (`id_cliente`, `data`, `logradouro`, `numero`, `complemento`, `cidade`, `observacao`) VALUES ';
        eventos.forEach(function(evento, indice){
            let dataArray = evento.data.split('/');
            let data = (dataArray[2]+'-'+dataArray[1]+'-'+dataArray[0]);
            sql += "('"+evento.id_cliente+"', '"+data+"', '"+evento.logradouro+"', '"+evento.numero+"', '"+evento.complemento+"', '"+evento.cidade+"', '"+
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
            if (err) {
                return resolve({status: false,
                                resultado: err});
            }
            return resolve({status: true,
                            resultado: results});
            });
        });   
        
    }

    inserirEvento(evento){
        let sql = 'INSERT INTO play.evento SET ?';
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, evento, function (err, results, fields) {
            if (err) return resolve(err);
            else{
                return resolve(results);
                }
            });
        });  
    }  

    inserirBrinquedoNoEvento(brinquedosEvento){
        
        let sql = 'INSERT INTO play.evento_brinquedo (`brinquedo`, `evento`) VALUES';
        let valores = [];
        brinquedosEvento.brinquedos.forEach(brinquedo => {
            sql += " ('"+brinquedo+"', '"+brinquedosEvento.evento+"'),"
        });
        sql = sql.substring(0, (sql.length - 1));
        sql += ';';     
    
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, function (err, results, fields) {
            if (err) {
                console.log(err);
                return resolve(err);
            }
            else{
                return resolve(results);
                }
            });
        }); 
    }

    editarCliente(cliente){
        let sql = "UPDATE cliente SET ? WHERE cliente.id_cliente = " + cliente.id_cliente;
        var db = this;
        return new Promise(function (resolve){
            db.connection.query(sql, cliente, function(err, results, fields){
                if(err){
                    return resolve(err);
                }else{
                    return resolve(results);
                }
            });
        });
    }
}

module.exports = Db;


async function main(){
    /*
    NOVO BRINQUEDO
    var cama = new Brinquedo();
    cama.nome_brinquedo = "Cama Elástica";
    cama.observacao = "rede rasgada";
    cama.quantidade = 3;
    cama.valor_brinquedo = 120.00;
    cama.caracteristicas = "2,5m";
    cama.foto_brinquedo = "/images/cama2,5m";
    */
   //NOVO CLIENTE
    //var cliente = new Cliente("Eli", "000.000.000-25","rua Equador", 165, "esq. av. Brasil", "", "Capão da Canoa", "51993101122", "51991625582", null, "eli.sm@hotmail.com", "cara chato pra caramba");
    /*
    NOVO EVENTO
    var data = new Date();
    data.setDate(19);
    data.setMonth(05);
    data.setFullYear(2019);
    var evento = new Evento(1, data, "Rua Ubatuba de Farias", 165, null, "Capão da Canoa", 330.00, 0, 30.00, "chegar cedo");
    */
    var db = new Db();
    console.log(await db.selectEventosPorData('2019-06-19'));
}

//main();



