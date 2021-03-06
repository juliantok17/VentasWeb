// Javascript: Inicializacion de Objeto Aviso Instanciado con Llaves
AVISO = {};

// Creacion de un Metodo consultar() en el Objeto Aviso

AVISO.listarAvisos = function () {
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../AvisosControler');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {

            AVISO.resModelo = JSON.parse(xhr.responseText);
            var templateProductos = document.querySelector('#templateVistaProductos').innerHTML;

            var listaAvisosJSON = {
                "productos": AVISO.resModelo
            };
            var listaProd = Mustache.render(templateProductos, listaAvisosJSON);

            var mostrar = document.querySelector('#lista');

            mostrar.innerHTML = listaProd;
        }

    };    
    xhr.send(null);
};


AVISO.buscarAvisos = function () {
//    var elEvento = arguments[0] || window.event;
//    var tecla = elEvento.keyCode;
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '../Editar');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {

            AVISO.resModelo = JSON.parse(xhr.responseText);
            var templateProductos = document.querySelector('#templateVistaProductos').innerHTML;

            var listaAvisosJSON = {
                "productos": AVISO.resModelo
            };
            var listaProd = Mustache.render(templateProductos, listaAvisosJSON);

            var mostrar = document.querySelector('#lista');

            mostrar.innerHTML = listaProd;
        }

    };
    var texto = document.querySelector("#buscar").value;    
    xhr.send(texto);
};

// Creacion de un Metodo insertar() en el Objeto PERSONA
AVISO.insertar = function () {
    // Instanciar el Objeto AJAX que existe en todos los Navegadores Web  
    var valTitulo = document.querySelector("#titulo").value;
    var valDescripcion = document.querySelector("#descripcion").value;
    var valPrecio = document.querySelector("#precio").value;

    if ((valTitulo !== "") && (valDescripcion !== "") && (valPrecio !== "")) {

        var xhr = new XMLHttpRequest();
        // Metodo INSERTAR, Accion PersonaServer
        xhr.open("POST", "../AvisosControler", "true");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // Metodo Respuesta que se ejecuta en y muestra al finalizar el AJAX.

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {                
                humane.log(xhr.responseText, {addnCls: 'humane-flatty-success'});
                AVISO.listarAvisos();                
            } 
            else if(xhr.readyState !== 2 && xhr.readyState !== 3 && xhr.status !== 200){                 
                humane.log('"ERROR", no se pudo grabar el aviso', {addnCls: 'humane-flatty-error'});                
            }   
        };


        // objeto para enviar los parametros del formulario
        var aviso = {};
        aviso.nombreAvisos = document.querySelector("#titulo").value;
        aviso.descripcionAvisos = document.querySelector("#descripcion").value;
        aviso.precioAvisos = document.querySelector("#precio").value;
        // formato del mensaje en JSON
        var avisoStringJSON = JSON.stringify(aviso);

        xhr.send(avisoStringJSON);
    }
};


// Creacion de un Metodo actualizar() en el Objeto PERSONA
AVISO.actualizar = function (id) {
    // Instanciar el Objeto AJAX que existe en todos los Navegadores Web    
    var xhr = new XMLHttpRequest();
    // Metodo ACTUALIZAR, Accion PersonaServer
    xhr.open("PUT", "../AvisosControler");
    // Metodo Respuesta que se ejecuta en y muestra al finalizar el AJAX.    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //alert(xhr.responseText);
            AVISO.listarAvisos();
            humane.log(xhr.responseText, {addnCls: 'humane-flatty-success'});
        }
        else if(xhr.readyState !== 2 && xhr.readyState !== 3 && xhr.status !== 200){
            humane.log('"ERROR", no se pudo actualizar el aviso', {addnCls: 'humane-flatty-error'});
        }
    };
    // objeto para enviar los parametros del formulario
    var aviso = {};

    aviso.idAvisos = id;
    aviso.nombreAvisos = document.querySelector("#nomAviso_" + id).value;
    aviso.descripcionAvisos = document.querySelector("#desAviso_" + id).value;
    aviso.precioAvisos = document.querySelector("#preAviso_" + id).value;

    // formato del mensaje en JSON
    var avisoStringJSON = JSON.stringify(aviso);
    xhr.send(avisoStringJSON);

};

// Creacion de un Metodo eliminar() en el Objeto PERSONA
AVISO.eliminar = function (id) {
    // Instanciar el Objeto AJAX que existe en todos los Navegadores Web
    var xhr = new XMLHttpRequest();
    // Metodo ELIMINAR, Accion PersonaServer
    xhr.open("DELETE", "../AvisosControler");
    // Metodo Respuesta que se ejecuta en y muestra al finalizar el AJAX.
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //alert(xhr.responseText);
            AVISO.listarAvisos();
            humane.log(xhr.responseText, {addnCls: 'humane-flatty-success'});
        }
        else if(xhr.readyState !== 2 && xhr.readyState !== 3 && xhr.status !== 200){
            humane.log('"ERROR", no se pudo eliminar el aviso', {addnCls: 'humane-flatty-error'});
        }
    };
    // objeto para enviar los parametros del formulario
    var aviso = {};
    aviso.idAvisos = id;
    aviso.nombreAvisos = document.querySelector("#nomAviso_" + id).value;
    aviso.descripcionAvisos = document.querySelector("#desAviso_" + id).value;
    aviso.precioAvisos = document.querySelector("#preAviso_" + id).value;
    // formato del mensaje en JSON
    var avisoStringJSON = JSON.stringify(aviso);
    xhr.send(avisoStringJSON);
};

var MA = {};

MA.obtenerModelo = function () {
     
    //console.log(texto);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'AvisosControler');    
    xhr.onreadystatechange = function () {
        
        if (xhr.readyState == 4 && xhr.status == 200) {
            MA.modeloAvisos = JSON.parse(xhr.responseText);
        }
        MA.obtenerPlantilla();
    };
    
    xhr.send(null);
};

MA.obtenerPlantilla = function () {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'vista/vista_avisos.html');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {

            MA.vistaAvisos = xhr.responseText;
        } //else {
        //alert("no cargo la vista")
        //}
        MA.mostrarAvisos();
    };
    xhr.send(null);
};

MA.mostrarAvisos = function () {
    var listaAvisosJSON = {
        "listaavisos": MA.modeloAvisos
    };
    var contenido = document.querySelector("#art1");
    var todo = Mustache.render(MA.vistaAvisos, listaAvisosJSON);
    contenido.innerHTML = todo;
};
