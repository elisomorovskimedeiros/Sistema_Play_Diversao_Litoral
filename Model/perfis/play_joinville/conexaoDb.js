/*
const connection = ({
    host     : 'mysql10-farm76.kinghost.net',
    user     : 'solevento01',
    password : 'playnh01',
    database : 'solevento01', //não colocar se for criar um banco através do node
    multipleStatements: true //cuidado: deve ser falso (padrão) para evitar sql injection - com ele true testar a rota: http://localhost:3000/post/1;DROP%20TABLE%20posts
});*/

const connection = ({
    host     : 'localhost',
    user     : 'play',
    password : 'play',
    database : 'play', //não colocar se for criar um banco através do node
    multipleStatements: true //cuidado: deve ser falso (padrão) para evitar sql injection - com ele true testar a rota: http://localhost:3000/post/1;DROP%20TABLE%20posts
});

module.exports = connection;