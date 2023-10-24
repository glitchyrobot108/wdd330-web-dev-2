// function renderOutputData(data, output_e){
//     //Location
//     const location = data.location
//     let location_header_e = document.createElement("h2")
//     location_header_e.innerHTML = `${location.name}, ${location.region}, ${location.country}`
//     output_e.appendChild(location_header_e)
//     let location_coords_e = document.createElement("p")
//     location_coords_e.innerHTML = `Latitude, Longitude : ${location.lat}, ${location.lon}`
//     output_e.appendChild(location_coords_e)
// }

function getDayName(day){
    let y = day.slice(0, 4)
    let m = day.slice(5, 7)
    let d = day.slice(8, 10)
    let date = new Date(`${m}-${d}-${y}`).getDay()
    let day_name = 0
    switch(date){
        case 0:
            day_name = "Sunday"
            break
        case 1:
            day_name = "Monday"
            break
        case 2:
            day_name = "Tuesday"
            break
        case 3:
            day_name = "Wednesday"
            break
        case 4:
            day_name = "Thursday"
            break
        case 5:
            day_name = "Friday"
            break
        case 6:
            day_name = "Saturday"
            break
    }
    return day_name
}

function dayTemplate(day){
    let day_name = getDayName(day.date)
    let html = 
    `<div id="day">
        <img src="${day.day.condition.icon}" alt="Image of ${day.day.condition.text}">
        <p id="condition">${day.day.condition.text}</p>
        <p id="date">${day.date}</p>
        <p id="day_name">${day_name}</p>
        <p id="max_temp">High of ${day.day.maxtemp_f}F</p>
        <p id="min_temp">Low of ${day.day.mintemp_f}F</p>
        <p id="humidty">Avg. Humidty ${day.day.avghumidity}%</p>
        <p id="max_wind">Max Wind Speed ${day.day.maxwind_mph}mph</p>
        <p id="rain_chance">Rain Chance ${day.day.daily_chance_of_rain}%</p>
        <p id="snow_chance">Snow Chance ${day.day.daily_chance_of_snow}%</p>
    </div>`
    return html
}

function renderOutputData(data, output_e){
    let html = ""
    let days = data.forecast.forecastday
    localStorage.setItem("days", Array(days))
    console.log(days)
    days.forEach(element => {
        html += dayTemplate(element)
    });
    output_e.insertAdjacentHTML("beforeend", html)
}

async function getWeatherData(){
    //Get output element
    const output_e = document.querySelector("#output")
    output_e.innerHTML = ""

    //Get paramater
    let location = document.querySelector("#param").value
    let days = document.querySelector("#days").value
    if(!location){
        alert("Please enter a parameter into the text box")
        return
    }

    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}&days=${days}`;
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
