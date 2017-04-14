(function(){

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;


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

    let tempoInicial = performance.now();;

    let db = new PouchDB('db');

    db.put({
        _id: 'dados',
        nome: dadosTeste
    }).then(function (response) {
        let tempoFinal = performance.now();;
        console.log((tempoFinal - tempoInicial));
    }).catch(function (err) {
        console.log("erro");
    });

}

function retrieve(){
    let tempoInicial = performance.now();;
    let db = new PouchDB('db');

    db.get('dados').then(function(doc) {
        let tempoFinal = performance.now();;
        console.log((tempoFinal - tempoInicial));
    });
}

function remove(){

    let tempoInicial = performance.now();;
    let db = new PouchDB('db');

    db.get('dados').then(function(doc) {
        return db.remove(doc);
    }).then(function (result) {
        let tempoFinal = performance.now();;
        console.log((tempoFinal - tempoInicial));
    }).catch(function (err) {
        console.log(err);
    });
}

// -----------------------------------------------------------

function testeInsert(){

    let db = new PouchDB('db');

    db.get('dados').then(function(doc) {
        return db.remove(doc);
    }).then(function (result) {
        insert();
    }).catch(function (err) {
        console.log(err);
    });

}

function testeRetrieve(){
    retrieve();
}

function testeRemove(){

    let db = new PouchDB('db');

    db.put({
        _id: 'dados',
        nome: dadosTeste
    }).then(function (response) {
        remove();
    }).catch(function (err) {
        console.log(err);
    });
}
