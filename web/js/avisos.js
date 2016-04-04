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

// Creacion de un Metodo insertar() en el Objeto PERSONA
AVISO.insertar = function () {
    // Instanciar el Objeto AJAX que existe en todos los Navegadores Web
    console.log("grabar 1");
    var xhr = new XMLHttpRequest();
    // Metodo INSERTAR, Accion PersonaServer
    xhr.open("POST", "../AvisosControler");
    // Metodo Respuesta que se ejecuta en y muestra al finalizar el AJAX.
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            AVISO.listarAvisos();
            //alert(xhr.responseText);
            
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
};

// Creacion de un Metodo actualizar() en el Objeto PERSONA
AVISO.actualizar = function(id){
    // Instanciar el Objeto AJAX que existe en todos los Navegadores Web
    console.log("ACTUALIZAR 1");
    var xhr = new XMLHttpRequest();
    // Metodo ACTUALIZAR, Accion PersonaServer
    xhr.open("PUT","../AvisosControler");
    // Metodo Respuesta que se ejecuta en y muestra al finalizar el AJAX.
    console.log("ACTUALIZAR 2");
    xhr.onreadystatechange = function(){
        if( xhr.readyState === 4 && xhr.status === 200){
            //alert(xhr.responseText);
            AVISO.listarAvisos();
            console.log("ACTUALIZAR RESPONSETEXT");
        }
    };
    // objeto para enviar los parametros del formulario
    var aviso = {};
    console.log("ACTUALIZAR ENVIO 1");
    aviso.idAvisos = id;    
    aviso.nombreAvisos = document.querySelector("#nomAviso_"+id).value;
    aviso.descripcionAvisos = document.querySelector("#desAviso_"+id).value;
    aviso.precioAvisos = document.querySelector("#preAviso_"+id).value;
    console.log("ACTUALIZAR ENVIO 2");
    // formato del mensaje en JSON
    var avisoStringJSON = JSON.stringify(aviso);    
    xhr.send(avisoStringJSON);
    console.log("ACTUALIZAR ENVIO 3");
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
        }
    };
    // objeto para enviar los parametros del formulario
    var aviso = {};
    aviso.idAvisos = id;    
    aviso.nombreAvisos = document.querySelector("#nomAviso_"+id).value;
    aviso.descripcionAvisos = document.querySelector("#desAviso_"+id).value;
    aviso.precioAvisos = document.querySelector("#preAviso_"+id).value;
    // formato del mensaje en JSON
    var avisoStringJSON = JSON.stringify(aviso);    
    xhr.send(avisoStringJSON);
};

var MA = {};

MA.obtenerModelo = function () {

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

