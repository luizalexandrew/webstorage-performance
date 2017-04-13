(function(){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            window.dadosTeste = JSON.parse(this.responseText);

            //Operações de testes no banco;
            // testeInsert();
            // testeRetrieve();
            testeRemove();

        }
    };
    xhttp.open("GET", "./dados.json");
    xhttp.send();

})();


function insert(){

     let tempoInicial = performance.now();

    //Operação no banco de dados
    localStorage.setItem("dados", JSON.stringify(dadosTeste));

     let tempoFinal = performance.now();
    console.log((tempoFinal - tempoInicial)/1000);
}

function retrieve(){
    let tempoInicial = performance.now();

    let dados = localStorage.getItem("dados");

    let tempoFinal = performance.now();
    console.log((tempoFinal - tempoInicial)/1000);

}

function remove(){
    let tempoInicial = performance.now();

    localStorage.removeItem("dados");

    let tempoFinal = performance.now();
    console.log((tempoFinal - tempoInicial)/1000);
}

function testeInsert(){
        localStorage.removeItem("dados");
        insert();
}

function testeRetrieve(){
        localStorage.setItem("dados", JSON.stringify(dadosTeste));
        retrieve();
}

function testeRemove(){
        localStorage.setItem("dados", JSON.stringify(dadosTeste));
        remove();
}