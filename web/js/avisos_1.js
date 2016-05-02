PAGINA_EDITAR = {};
var pagEditar = "";
//PAGINA_EDITAR.cargar = function () {
//    var xhr = new XMLHttpRequest();
//    xhr.open('POST', 'abm/editar.html');
//    
//    xhr.onreadystatechange = function () {
//        if (xhr.readyState === 4 && xhr.status === 200) {
//            pagEditar = xhr.responseText;
//            console.log(pagEditar);
//            //document.querySelector("#section1").innerHTML = pagEditar;
//            PAGINA_EDITAR.traer();
//        }
//
//    };
//    xhr.send(null);
//
//};
//
PAGINA_EDITAR.traer = function () {
    var xhr = new XMLHttpRequest();
    var enviarHTML = xhr.open('GET', 'PagEditarControler');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var recibirPagEditar = xhr.responseText;
            console.log(recibirPagEditar);
            document.querySelector("#section1").innerHTML = recibirPagEditar;
        }

    };
    xhr.send(pagEditar);
};



