const mysql = require("mysql"),
    Brinquedo = require("../Model/Brinquedo"),
    Cliente = require("../Model/Cliente"),
    Evento = require("../Model/Evento");

class Db{
    constructor(){
        this.connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'play',
            password : 'play',
            database : 'play', //não colocar se for criar um banco através do node
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

    selectEventosPorData(data){
        //var inicio = "\'" + data + " 00:00:00\'";
        //var fim = "\'" + data + " 23:59:59\'";
        //data = inicio + " AND " + fim;
        let sql = 'SELECT * FROM evento WHERE evento.data BETWEEN ' + data;
        let sql = 'SELECT * FROM evento WHERE evento.data = ?';
        var db = this;
        console.log(sql);
        
        
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, function (err, results, fields) {
            if (err) return reject(err);
            return resolve(result);
            });
        }); 
        

    }

    inserirBrinquedo(brinquedo){
        let sql = 'INSERT INTO play.brinquedo SET ?';                     
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, brinquedo, function (err, results, fields) {
            if (err) return reject(err);
            return resolve(results);
            });
        });    
    }

    inserirCliente(cliente){
        let sql = 'INSERT INTO play.cliente SET ?';
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, cliente, function (err, results, fields) {
            if (err) return reject(err);
            return resolve(results);
            });
        });  
    }

    inserirEvento(evento){
        let sql = 'INSERT INTO play.evento SET ?';
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, evento, function (err, results, fields) {
            if (err) return reject(err);
            else{
                return resolve(results);
                }
            });
        });  
    }  

    inserirBrinquedosNoEvento(id_evento, id_brinquedo){
        var evento_brinquedo = {
            brinquedo: id_brinquedo,
            evento: id_evento
        }
        let sql = 'INSERT INTO play.evento_brinquedo SET ?';
        var db = this;
        return new Promise(function (resolve, reject) {
            db.connection.query(sql, evento_brinquedo, function (err, results, fields) {
            if (err) return reject(err);
            else{
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



