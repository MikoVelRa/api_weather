const n = navigator;
const coordenadas = {};

function success(position){
    const { coords: { latitude, longitude } } = position;
    
    // coordenadas.latitude = parseInt(latitude);
    // coordenadas.longitude = parseInt(longitude);

    coordenadas.latitude = latitude;
    coordenadas.longitude = longitude;
}

function error(error){
    const { message } = error;
    coordenadas.err = message;
}

const options = {
    enableHighAccurracy: true, //Para lograr una mejor precisión en la búsqueda
    timeout: 5000, //Tiempo de espera máximo en hacer la solicitud
    maximumAge: 0 //Deshabilitamos el caché las peticiones.
}

n.geolocation.getCurrentPosition(success, error, options);

export default coordenadas;