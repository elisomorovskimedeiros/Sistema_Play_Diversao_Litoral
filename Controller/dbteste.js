const mysql = require("mysql"),
    Brinquedo = require("../Model/Brinquedo"),
    Cliente = require("../Model/Cliente"),
    Evento = require("../Model/Evento");

var Db = function(){
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


async function main(){
    var db = await new Db();
    db.connection.query("select * from brinquedo", function(err, result){
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    });
}
main();
