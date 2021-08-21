import coordenadas  from './getCurrentPosition.js';

//Variables
const contenedor = document.querySelector('#container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#form');

//Events Listeners
window.addEventListener('load', () => {
    obtenerClimaUbicacion();
    formulario.addEventListener('submit', buscarClima);
});


function obtenerClimaUbicacion(){
    // console.log(coordenadas)
    const {latitude, longitude, err} = coordenadas;    

    if(err){
        resultado.classList.add('text-white', 'text-center', 'mb-8', 'text-lg');        
        resultado.textContent = err;
        return;
    }

    const latitud = Number(latitude.toFixed(2));
    const longitud = Number(longitude.toFixed(2));    

    const apiKey = "ccea4cc8de2155372cd8556983e87190";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apiKey}&lang=es`;    

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data)      
            limpiarHTML();
            if(data.cod === "404"){
                mostrarError(data.message)
            } else{
                mostrarInfo(data)
            }
        });
    
}

function buscarClima(e){
    e.preventDefault();
    
    const ciudad = document.querySelector('#txtCity').value;
    const pais = document.querySelector('#cmbCountry').value;

    if(ciudad === '' || pais === ''){
        mostrarError("Por favor, complete todos los campos correctamente");
        return;
    }

    //Petición a API
    requestAPI(ciudad, pais);
}

function mostrarError(mensaje){
    const alert = document.querySelector('.bg-red-100');

    if(!alert){
        const alert = document.createElement('div');
        alert.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto',
        'mt-6', 'text-center', 'mb-12');
    
        alert.innerHTML = `
            <strong class="font-bold">Error!!</strong>
            <span class="block">${mensaje}</span>
        `;
    
        contenedor.appendChild(alert);
    
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }

}

function requestAPI(ciudad, pais){
    const apiKey = "ccea4cc8de2155372cd8556983e87190";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}&lang=es`;

    fetch(url)
        .then(response => response.json())
        .then(data => {      
            // console.log(data)      
            limpiarHTML();
            if(data.cod === "404"){
                mostrarError(data.message)
            } else{
                mostrarInfo(data)
            }
        });
}

function mostrarInfo(data){
    // console.log(data)
    const { weather: {0: {description, icon} }, name, main : { temp, temp_max, temp_min } } = data,
        urlImage = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    // console.log(description)

    const nombreCiudad = document.createElement('p');
    nombreCiudad.innerHTML = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl', 'mb-5');    

    const descripcionClima = document.createElement('p');
    descripcionClima.innerHTML = `${description}`;
    descripcionClima.classList.add('text-sm');

    const img = document.createElement('img');
    img.src = urlImage;
    img.classList.add('mb-3', 'mx-auto');

    const tempActual = document.createElement('p');
    tempActual.innerHTML = `${calcularGrados(temp)} &#8451`;
    tempActual.classList.add('font-bold', 'text-6xl', 'mb-5');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${calcularGrados(temp_max)} &#8451`;
    tempMaxima.classList.add('text-xl');

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${calcularGrados(temp_min)} &#8451`;
    tempMinima.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('mb-10', 'text-center', 'text-white');
    
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(descripcionClima);
    resultadoDiv.appendChild(img);
    resultadoDiv.appendChild(tempActual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);
    
    resultado.appendChild(resultadoDiv);
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

const calcularGrados = temperatura => (temperatura - 273.15).toFixed(1);