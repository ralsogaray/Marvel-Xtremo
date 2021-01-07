const express = require('express');

const server = express()//al depositar en server, cuando se ejecute el module express, se deposita en server (las confirguraciones adicionales las voy a hacer en server)

const docs = express.static("estaticos")//en la carpeta 'estaticos' esta el HTML que voy a buscar, entonces le pido a express que en la carpeta de archivos estaticos busque el index.html y le digo que haga uso de dicho archivo. Lo transforma a objeto
const urlencoded = express.urlencoded({ extended : true}) //<-- convierte de formdata a objeto. Parseo los datos para poder usarlos con mi codigo
const json = express.json() //<-- convierte de JSON a objeto. Parseo los datos para poder usarlos con mi codigo, idem arriba.


const baseDePersonajes = [] //<-- mini base de datos


server.use( docs ) //le digo al server que utilice los almancenado en la constancia "docs" y le va a dar prioridad (si no funciona, se utilizara una configuracion especifica para cuando no funciona)

server.use( urlencoded ) 
server.use( json )
server.listen(2000);


server.post('/agregar', function(request, response){ 
    
    baseDePersonajes.push(request.body)
    
    console.log(`La base de datos de personajes tiene:`)
    console.log(baseDePersonajes)
    response.end('mira la consola');
})
