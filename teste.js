const     express = require("express");  
              ejs = require("ejs");
       bodyParser = require("body-parser"),
   methodOverride = require("method-override");
        Interface = require("./Controller/Interface");
const app = express();



async function main(){
    
    var str = "INSERT INTO play.evento_brinquedo (`brinquedo`, `evento`) VALUES ('4', '16'), ('5', '16'),";
    str = str.substring(0, (str.length - 1));
    str += ';';
    console.log(str);
}
main();

