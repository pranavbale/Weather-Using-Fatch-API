const table1 = document.getElementById("disCountries");

async function countApi() {
    let countApis = await fetch("https://restcountries.com/v3.1/all")
        .then((res) => res.json())
        .then((data) => {
            var l = Object.keys(data).length;
            // console.log(l);
            // console.log(data);

            for (let i = 0; i < l;) {
                // console.log(data[i].name.common);
                // console.log(data[i].latlng);
                let row = table1.insertRow();
                for (let j = 0; j < 3;) {
                    let val = data[i];
                    let cell = row.insertCell();
                    cell.innerHTML = `
                                        <div class="card" style="width: 18rem;">
                      <img src="${val.flags.png}"  class="card-img-top flag" alt="${val.name.common} flag">
                      <div class="card-body">
                        <h5 class="card-title">${val.name.common}</h5>
                        
                      
                        <p>Capital : ${val.capital}</p>
                        <p>Region : ${val.region}</p>
                        <p>Country codes : ${val.area}</p>
                        <button type="button" onclick="weather('${val.latlng},${val.name.common}')" class="btn btn-secondary btn-lg" >Click for Weather</button>
                      </div>
                    </div>
                    `;

                    j = j + 1;
                    i = i + 1;
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

async function weather(latlng, name) {
    latlng = latlng.split(",");
    // console.log(latlng);
    const lat = latlng[0];
    const lon = latlng[1];
    const api = "API_KEY";    // need to add a API_key form the openweather website 
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`;
    // console.log(typeof (lat), lon);
    const wedApi = await fetch(url)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            // console.log(data.main.temp);
            temp = data.main.temp;
            temp = temp - 273.15;
            temp = temp.toFixed(2);
            window.alert(`Temperature is ${temp}°C`);
        }).catch((err) => {
            console.log(err);
        })
}

countApi();
