const connection = ({
    host     : 'mysql10-farm76.kinghost.net',
    user     : 'solevento_add01',
    password : 'Medeiros15',
    database : 'solevento01', //não colocar se for criar um banco através do node
    multipleStatements: true //cuidado: deve ser falso (padrão) para evitar sql injection - com ele true testar a rota: http://localhost:3000/post/1;DROP%20TABLE%20posts
});

module.exports = connection;