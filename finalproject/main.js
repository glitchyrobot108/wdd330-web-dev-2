function renderOutputData(data, output_e){
    //Location
    const location = data.location

    let location_header_e = document.createElement("h2")
    location_header_e.innerHTML = `${location.name}, ${location.region}, ${location.country}`
    output_e.appendChild(location_header_e)
    let location_coords_e = document.createElement("p")
    location_coords_e.innerHTML = `Latitude, Longitude : ${location.lat}, ${location.lon}`
    output_e.appendChild(location_coords_e)
    
}

async function getWeatherData(){
    //Get output element
    const output_e = document.querySelector("#output")

    //Get paramater
    let param = document.querySelector("#param").value
    // param = "russia"

    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${param}`;
    const options = {
	    method: 'GET',
	    headers: {
            'X-RapidAPI-Key': 'f8a141d008msh6e363acc6c8cd2ap1bec52jsnc4590035a63b',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        renderOutputData(result, output_e)
        // console.log(result)
    } catch (error) {
        console.error(error);
    }
}

//Listen for button click
document.querySelector("#get-weather-button").addEventListener("click", getWeatherData)
