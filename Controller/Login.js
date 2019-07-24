const   LocalStrategy  = require('passport-local').Strategy,                
        mysql          = require("mysql"),
        crypto         = require('crypto'),
        flash          = require('connect-flash');
        //express = require('express'),
        //router = express.Router(),
        


let login = function(passport){
   
    connection = mysql.createPool({
        supportBigNumbers: true,
        bigNumberStrings: true,          
        host     : 'mysql10-farm76.kinghost.net',
        user     : 'solevento',
        password : 'Medeiros15',
        database : 'solevento', //não colocar se for criar um banco através do node
        multipleStatements: false
    });
/*
    connection.connect(function(err){
        if(err){
            console.log("Deu erro!linha 17");
            console.log(err);
        }else{
            console.log("Conectado com o BD!");
        }
    });*/
    
    

  
    
    passport.use('local', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true //passback entire req to call back
    } , function (req, username, password, done){

            if(!username || !password ) { return done(null, false, req.flash('message','Preencher todos os campos.')); }
            var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
            connection.query("select * from usuario where username = ?", [username], function(err, rows){
                console.log(err); 
                console.log(rows);
            if (err) return done(req.flash('message',err));
            if(!rows.length){ return done(null, false, req.flash('message','Usuário ou senha inválidos.')); }
            salt = salt+''+password;
            var encPassword = crypto.createHash('sha1').update(salt).digest('hex');
            var dbPassword  = rows[0].password;
            if(!(dbPassword == encPassword)){
                return done(null, false, req.flash('message','Usuário ou senha inválidos.'));
            }
            console.log("logou dentro do passport.use");
            return done(null, rows[0]);
            });
        }
    ));
    
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        this.connection.query("select * from usuario where id = "+ id, function (err, rows){
            done(err, rows[0]);
        });
    });   
    return this;
}        




module.exports = login;
   


        