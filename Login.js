const   LocalStrategy  = require('passport-local').Strategy,
        expressSession = require('express-session'),        
        mysql          = require("mysql"),
        crypto         = require('crypto'),
        flash          = require('connect-flash'),
        express = require('express'),
        router = express.Router(),
        passport       = require("passport");


class Login{
    constructor(app){
        this.app = app;
        this.passport = passport;
        console.log("executanto o arquivo Login.js");
        this.connection = mysql.createConnection({
            supportBigNumbers: true,
            bigNumberStrings: true,          
            host     : 'localhost',
            user     : 'play',
            password : 'play',
            database : 'db_users', //não colocar se for criar um banco através do node
            multipleStatements: false
        });

        this.connection.connect(function(err){
            if(err){
                console.log("Deu erro!linha 17");
                console.log(err);
            }else{
                console.log("Conectado com o BD!");
            }
        });
        
        this.app.use(expressSession({
            name: 'JSESSION',
            secret: 'MYSECRETISVERYSECRET',
            resave: false,
            saveUninitialized: false
        }));

        this.app.use(flash());
        this.app.use(this.passport.initialize());
        this.app.use(this.passport.session());

        this.passport.use('local', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true //passback entire req to call back
        } , function (req, username, password, done){
            console.log("password: "+ password);
                if(!username || !password ) { return done(null, false, req.flash('message','All fields are required.')); }
                var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
                this.connection.query("select * from usuario where username = ?", [username], function(err, rows){
                    console.log(err); 
                    console.log(rows);
                if (err) return done(req.flash('message',err));
                if(!rows.length){ return done(null, false, req.flash('message','Invalid username or password.')); }
                salt = salt+''+password;
                var encPassword = crypto.createHash('sha1').update(salt).digest('hex');
                console.log("Password cripto: "+encPassword);
                var dbPassword  = rows[0].password;
                if(!(dbPassword == encPassword)){
                    return done(null, false, req.flash('message','Invalid username or password.'));
                }
                return done(null, rows[0]);
                });
            }
        ));
        
        this.passport.serializeUser(function(user, done){
            done(null, user.id);
        });
    
        this.passport.deserializeUser(function(id, done){
            this.connection.query("select * from usuario where id = "+ id, function (err, rows){
                done(err, rows[0]);
            });
        });   
        
        router.get('/login', function(req, res, next){
            res.render('login',{'message' :req.flash('message')});
        });
            
            //executa o login do usuario
            
        router.post("/login", this.passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
            }), function(req, res, info){
            res.render('index',{'message' :req.flash('message')});
        });
            
            //faz o logout do usuário
        router.get("/logout", function(req, res){
                //passaporte destroi todos os dados do usuário na seção
            req.logout();
            res.redirect("/");
        });     
        
    }

    //funcao que será usada como middleware para verificar se o usuário está logado antes de mostrar a página
    isLoggedIn(req, res, next){
        console.log("executou o logged");
        if(req.isAuthenticated()){
            return next(); //prossegue com a execucao
        }
        res.redirect("/login"); //não prossegue com a execução e redireciona para a página login
    }    
}



module.exports = Login;
   


        