(function(){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            window.dadosTeste = JSON.parse(this.responseText);

            //Operações de testes no banco;
            insert();
            // retrieve();
            // update();
            // remove();

        }
    };
    xhttp.open("GET", "./dados.json");
    xhttp.send();

})();


function insert(){

    var tempoInicial = Date.now();

    //Operação no banco de dados

    var tempoFinal = Date.now();
    console.log((tempoFinal - tempoInicial)/1000);
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