//------- AGREGAR PERSONAJE AL DOM CON PROMPT
const agregarPersonajeDom = (personaje, descripcion, img, wiki) => {

    const capturo = document.querySelector("article").cloneNode(true)

    capturo.querySelector("img").src = img
    capturo.querySelector("h3").innerText = personaje
    capturo.querySelector("p").innerText = descripcion
    capturo.querySelector("h4 a").href = wiki


    capturo.classList.remove("d-none")

    document.querySelector("#ultimas-noticias").prepend(capturo);
}

// FUNCION PARA AGREGAR CON PROMPT (BOTON CON "NO DISPLAY (d-none)")
const enviarPersonajeConPrompt = async () => {
    //alert("OUCH!")

    const personaje = prompt("Diga nombre del personaje")
    const descripcion = prompt("Aguregue una descripcion!")
    const img = prompt("Agregue URL de imagen")
    const wiki = prompt("Agregue URL de wiki")

    

    const nuevoPersonaje = new FormData()

    nuevoPersonaje.append('name', personaje)
    nuevoPersonaje.append('description', descripcion)
    nuevoPersonaje.append('img', img)
    nuevoPersonaje.append('wiki', wiki)

    //console.log(nuevoPersonaje)

    const configs = {
        method: "POST",
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        body: nuevoPersonaje
    }

    await fetch('http://localhost:2000/agregar', configs)

    agregarPersonajeDom(personaje, descripcion, img, wiki)
}
//////////

//------------ AGREGAR PERSONAJE AL DOM CON FORMULARIO
const agregarDomFormulario = formularioDeshidratado => {
    const capturo = document.querySelector("article").cloneNode(true)
    
    const hidratado = JSON.parse(formularioDeshidratado) // convierto en objeto
    
    //console.log(hidratado)
    
    capturo.querySelector("img").src = hidratado.imagen
    capturo.querySelector("h3").innerText = hidratado.name
    capturo.querySelector("p").innerText = hidratado.description
    capturo.querySelector("h4 a").href = hidratado.wiki

    capturo.classList.remove("d-none")
    
    document.querySelector("#ultimas-noticias").prepend(capturo)
}


//----- enviar personaje a base de datos con formulario
const enviarPersonaje = async (evento) => {
    evento.preventDefault()
    const formularioCapturado = document.querySelector("#formulario-agregar-personaje") //capturo el formulario 

    const formDataPersonaje = new FormData( formularioCapturado )

    const formularioDeshidratado = JSON.stringify(Object.fromEntries(formDataPersonaje))
    
    //console.log(formularioDeshidratado);

    try{
    const configs = {
        method: 'POST',
        headers: {
        "Content-Type" : 'application/json'
        },
        body: formularioDeshidratado   //envio los datos 
    }

    await fetch('http://localhost:2000/agregar', configs)
    agregarDomFormulario(formularioDeshidratado)

    } catch(error){
        alert("Houston, we have a database problem");
        
    }
}

///------ CARGAR API DE MARVEL------
const cargarAPI = async () =>{
    try{
        
        const response = await fetch("https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=128846846f7c55248413f48652bf5b27&hash=80ce93dc8d92e26ecf9586acc364b332")//<-- CLAVE DE MARVEL + MD5 

        const hidratados = await response.json()
        const personajes = hidratados.data.results
        //console.log(personajes)
        personajes.forEach(personaje => {
            
            const capturo = document.querySelector("article").cloneNode(true)//padre para hacer el append

            capturo.querySelector("img").src = `${personaje.thumbnail.path}.${personaje.thumbnail.extension}`
            capturo.querySelector("h3").innerText = personaje.name
            capturo.querySelector("p").innerText = personaje.description
            capturo.querySelector("h4 a").href = personaje.urls[1].url
            capturo.classList.remove("d-none")
            document.querySelector("#ultimas-noticias").appendChild(capturo);
        })
    } catch(error){
        alert("no funciona")
    }
}




//--- ENVIAR PERSONAJE CON PROMPT
document.querySelector("#boton-prompt").onclick = enviarPersonajeConPrompt

//--- ENVIAR PERSONAJE CON FORM
document.querySelector("#enviar-personaje").onclick = enviarPersonaje

window.onload = cargarAPI