const     express = require("express");  
              ejs = require("ejs");
       bodyParser = require("body-parser"),
   methodOverride = require("method-override");
        Interface = require("./Controller/Interface");
const app = express();



async function main(){
    var int = new Interface();
    let clientes = await int.listarTodosClientes().then(function(clientes){
        return clientes;
    });
    console.log(clientes[1]);
        /*clientes.forEach(cliente=>{
            console.log(cliente);
            console.log("----------------------------");
        });*/
        //res.render("listarTodosClientes", {clientes});

}
main();

