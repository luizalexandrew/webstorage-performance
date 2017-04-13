(function(){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            window.dadosTeste = JSON.parse(this.responseText);

            let conexao = new ConnectionFactory();
            insert(conexao);
            // retrieve();
            // update();
            // remove();

        }
    };
    xhttp.open("GET", "./dados.json");
    xhttp.send();

})();


function insert(conexao){

    dadosTeste.forEach((valor)=>{
        conexao.connection.transaction(function (transacao) {
            transacao.executeSql('INSERT INTO pessoas (nome, sobrenome, email) VALUES (?, ?, ?)', 
            [valor.nome, valor.sobrenome, valor.email], function(){console.log("deu certo"), function(){console.log("ERRO")}});
        });
    })



}

function retrieveAll(){

}

function retrieveById(){

}

function updateById(id, email){

}

function removeAll(){

}

function removeById(){
    //analisar
}

function ConnectionFactory() {

    this.connection = openDatabase("Aplicacao2", "1.0", "Banco de dados da aplicação", 3*1024*1024);

    this.connection.transaction(function (transacao) {
        transacao.executeSql('CREATE TABLE IF NOT EXISTS pessoas (id INTEGER PRIMARY KEY ASC, nome, sobrenome, email unique)');
    });

    // this.connection.transaction(function (transacao) {
    //     transacao.executeSql('DROP TABLE pessoas');
    //     console.log("todos removidos");
    // });

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