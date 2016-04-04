/*function ConsultaProducto(){
 var este = this;
 este.xhr = new XMLHttpRequest();
 este.xhr.open("GET", "Productos");
 este.xhr.onreadystatechange = function(){
 if(este.xhr.readyState == 4 &&
 este.xhr.status == 200){
 var elArtUno = document.querySelector("#art1");
 elArtUno.innerHTML = este.xhr.responseText;
 }
 };
 this.xhr.send(null);
 }
 var pruebaUno = new ConsultaProducto();*/

var MA = {};

MA.obtenerModelo = function () {

    var xhr = new XMLHttpRequest();
    xhr.open('get', 'AvisosControler', 'true');
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

//MA.obtenerModelo();

var BM = {};
/*
 var templateProductos = "<table><tr>{{#productos}}";
 templateProductos += "<td> <input type='text' id='prod_nombre_{{prod_id}}' value='{{prod_nombre}}'   /> </td>";
 templateProductos += "<td> <input type='number' id='prod_precio_{{prod_id}}' value='{{prod_precio}}'   /> </td>";
 templateProductos += "<td onclick='BASE.borrar({{prod_id}});'> Borrar </td>";
 templateProductos += "<td onclick='BASE.modificar({{prod_id}});'> Modificar </td>";
 templateProductos += "</tr>{{/productos}}</table>";
 */
BM.modeloProducto = function () {
    
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/Ventas/AvisosControler', 'true');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            
            BM.resModelo = JSON.parse(xhr.responseText);
            var templateProductos = document.querySelector('#templateVistaProductos').innerHTML;
            
            var listaAvisosJSON = {
                "productos": BM.resModelo
            };            
            var listaProd = Mustache.render(templateProductos, listaAvisosJSON);
            
            var mostrar =  document.querySelector('#lista'); 
            
            mostrar.innerHTML = listaProd;
        }
        
    };
    xhr.send(null);
};

BM.editarAviso = function(elId){
    var nomAvi = document.querySelector('#nomAviso_'+elId).value;
    
    var desAvi= document.querySelector('#desAviso_'+elId).value;
    var preAvi= document.querySelector('#preAviso_'+elId).value;
    var avisos = [];
    var avisos =
        {
            "idAvisos":elId,
            "nombreAvisos":nomAvi,
            "precioAvisos":preAvi,
            "descripcionAvisos":desAvi            
        };
    //var avisos_enviar =  '?aviJSON='  + JSON.stringify(avisos); 
//    var avisos_enviar =JSON.stringify(avisos); 
//    $.ajax({
//      url: '/Ventas/abm/AvisosEditar'+avisos_enviar,//'/abm/AvisosEditar',
//      type: 'POST', 
//      dataType: 'json',  
//      data: {aviJSON:avisos},//{aviJSON: avisos},
//      contentType: 'application/json',
//      mimeType: 'application/json',
//      success: function(result) {
//          alert('SUCCESS');
//      }
//    });
        
    location.href = '/Ventas/abm/AvisosEditar?aviJSON='+JSON.stringify(avisos); 
};



