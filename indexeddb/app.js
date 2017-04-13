(function(){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            window.dadosTeste = JSON.parse(this.responseText);


insert();


        }
    };
    xhttp.open("GET", "./dados.json");
    xhttp.send();

})();


function insert(){

             var request, db2;
              request = window.indexedDB.open("Teste", 2);

              request.onerror = function(event){
                    console.log("Erro ao abrir o banco de dados", event);
            }

            request.onsuccess = function(event){
                  console.log("Banco de dados aberto com sucesso");
                  db = event.target.result;


             }

  var nome = "luiz";
  var codigo = "123";

var transaction = db.transaction(["estudantes"],"readwrite");
    transaction.oncomplete = function(event) {
      console.log("Sucesso :)");
    };
    transaction.onerror = function(event) {
      console.log("Erro :(");
    };
    var objectStore = transaction.objectStore("estudantes");
    objectStore.add({codigo: codigo, nome: nome});

}

function retrieve(){

}

function remove(){

}


