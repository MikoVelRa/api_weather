const selectCountries = document.getElementById("cmbCountry");
const paises = [
    {
        pais: "Argentina",
        codigo: "AR"
    },

    {
        pais: "España",
        codigo: "ES"
    },

    {
        pais: "México",
        codigo: "MX"
    },

    {
        pais: "Estados Unidos",
        codigo: "US"
    },

    {
        pais: "Brasil",
        codigo: "BR"
    },

    {
        pais: "Australia",
        codigo: "AU"
    },

    {
        pais: "Alemania",
        codigo: "DE"
    },

    {
        pais: "Canadá",
        codigo: "CA"
    }
];

document.addEventListener("DOMContentLoaded", chargeCountries(paises));

// function chargeCountries(){
//     fetch('https://restcountries.eu/rest/v2/')
//         .then(response => response.json())
//         .then(countries => fillSelect(countries));
// }

function chargeCountries(paises) {
    const fragment = document.createDocumentFragment();
    paises.forEach((country) => {
      const { pais, codigo } = country;
      const paisOpcion = document.createElement("option");
      paisOpcion.value = codigo;
      paisOpcion.textContent = pais;
    
      fragment.appendChild(paisOpcion);
    });
    selectCountries.appendChild(fragment);
}
