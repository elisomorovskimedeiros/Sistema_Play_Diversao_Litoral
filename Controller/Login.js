const   LocalStrategy  = require('passport-local').Strategy,                
        mysql          = require("mysql"),
        crypto         = require('crypto'),
        Perfil         = require('../Model/Perfil'),
        ConexaoDbLogin = require("../../perfis/play_litoral/configuracaoConexao");
        


let login = function(passport){
   
    connection = mysql.createPool({
        supportBigNumbers: true,
        bigNumberStrings: true,
        host     : ConexaoDbLogin.host,
        user     : ConexaoDbLogin.user,
        password : ConexaoDbLogin.password,
        database : ConexaoDbLogin.database, //não colocar se for criar um banco através do node
        multipleStatements: false
    });
    
    passport.use('local', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true //passback entire req to call back
    } , function (req, username, password, done){
            if(!username || !password ) { 
                return done(null, false, req.flash('message','Preencher todos os campos.'), req.flash('username', '')); 
            }
            var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
            connection.query("select * from usuario where username = ?", [username], function(err, rows){
                
                if (err) 
                return done(null, false, req.flash('message',err), req.flash('username', username));
                if(!rows.length){ 
                    return done(null, false, req.flash('message','Usuário ou senha inválidos.'), req.flash('username', username));
                }

                let perfil = new Perfil();
                usuario = rows[0];
                
                salt = salt+''+password;
                var encPassword = crypto.createHash('sha1').update(salt).digest('hex');
                var dbPassword  = usuario.password;
                if(!(dbPassword == encPassword)){
                    return done(null, false, req.flash('message','Usuário ou senha inválidos.'), req.flash('username', username));
                }
                
                return done(null, usuario);                                        
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
   


        