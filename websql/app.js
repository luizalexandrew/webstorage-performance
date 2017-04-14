(function(){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            window.dadosTeste = JSON.parse(this.responseText);

            //Operações de testes no banco;
            // testeInsert();
            // testeRetrieve();
            // testeRemove();

        }
    };
    xhttp.open("GET", "./dados.json");
    xhttp.send();

})();


function insert(){

    let tempoInicial = performance.now();

    var conexao = new ConnectionFactory();

    conexao.connection.transaction((transacao)=> {
        dadosTeste.forEach((valor)=>{
            transacao.executeSql('INSERT INTO pessoas (nome, sobrenome, email) VALUES (?, ?, ?)',
            [valor.nome, valor.sobrenome, valor.email]);
        });
    }, function(err){console.log(err)}, function(success){
        let tempoFinal = performance.now();
        console.log((tempoFinal - tempoInicial));
    });

}

function retrieve(){
    let tempoInicial = performance.now();

    var conexao = new ConnectionFactory();

    conexao.connection.transaction(function (transacao) {
        var resultado = transacao.executeSql('SELECT * FROM pessoas', [],function (tx, results) {
            var resultados = [];
            var len = results.rows.length, i;
            for (i = 0; i < len; i++) {

                var pessoa ={
                    id: results.rows.item(i).id,
                    nome: results.rows.item(i).nome,
                    sobrenome: results.rows.item(i).sobrenome,
                    email: results.rows.item(i).email
                };
                resultados.push(pessoa);
            }
            let tempoFinal = performance.now();
            console.log((tempoFinal - tempoInicial));
        });

    });
}

function remove(){
    let tempoInicial = performance.now();
    var conexao = new ConnectionFactory();

    conexao.connection.transaction(function (transacao) {
        transacao.executeSql('DELETE FROM pessoas');
        let tempoFinal = performance.now();
        console.log((tempoFinal - tempoInicial));
    });

}

function ConnectionFactory() {

    this.connection = openDatabase("Aplicacao12", "1.0", "Banco de dados da aplicação", 5000000);

    this.connection.transaction(function (transacao) {
        transacao.executeSql('CREATE TABLE IF NOT EXISTS pessoas (id INTEGER PRIMARY KEY ASC, nome, sobrenome, email)');
    });

    this.getConnection = function(){
        if(this.connection){
            console.log(this.connection);
            return this.connection;
        }else{
            console.log("Falha ao criar Banco de Dados");
            return null;
        }
    }

}

// -----------------------------------------------------------

function testeInsert(){
    var conexao = new ConnectionFactory();

    conexao.connection.transaction(function (transacao) {
        transacao.executeSql('DELETE FROM pessoas');
    });

    insert();
}

function testeRetrieve(){
   retrieve();
}

function testeRemove(){

    var conexao = new ConnectionFactory();

    conexao.connection.transaction((transacao)=> {
        dadosTeste.forEach((valor)=>{
            transacao.executeSql('INSERT INTO pessoas (nome, sobrenome, email) VALUES (?, ?, ?)',
            [valor.nome, valor.sobrenome, valor.email]);
        });
    }, function(err){console.log(err)}, function(success){
        remove();
    });

}
