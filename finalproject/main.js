//Global variables
let days_list;
let temp_type = "f"
let speed_type = "mph"

function toggleTemp(){
    let nodes_max = document.querySelector("#output").querySelectorAll("#max_temp")
    let nodes_min = document.querySelector("#output").querySelectorAll("#min_temp")
    switch(temp_type){
    case "f":
        temp_type = "c"
        nodes_max.forEach((element)=>{
            let parent = element.parentElement
            let list_position = parent.getAttribute("list_position")
            let temp_c = days_list[list_position].day.maxtemp_c
            element.innerHTML = `High of ${temp_c}C°`
        })
        nodes_min.forEach((element)=>{
            let parent = element.parentElement
            let list_position = parent.getAttribute("list_position")
            let temp_c = days_list[list_position].day.mintemp_c
            element.innerHTML = `Low of ${temp_c}C°`
        })
        break
    case "c":
        temp_type = "f"
        nodes_max.forEach((element)=>{
            let parent = element.parentElement
            let list_position = parent.getAttribute("list_position")
            let temp_f = days_list[list_position].day.maxtemp_f
            element.innerHTML = `High of ${temp_f}F°`
        })
        nodes_min.forEach((element)=>{
            let parent = element.parentElement
            let list_position = parent.getAttribute("list_position")
            let temp_f = days_list[list_position].day.mintemp_f
            element.innerHTML = `Low of ${temp_f}F°`
        })
        break
   }
}

function toggleSpeed(){
    let nodes = document.querySelector("#output").querySelectorAll("#max_wind")
    switch(speed_type){
    case "mph":
        speed_type = "kph"
        nodes.forEach((element)=>{
            let parent = element.parentElement
            let list_position = parent.getAttribute("list_position")
            let spd_kph = days_list[list_position].day.maxwind_kph
            element.innerHTML = `Max Wind Speed ${spd_kph}kph`
        })
        break
    case "kph":
        speed_type = "mph"
        nodes.forEach((element)=>{
            let parent = element.parentElement
            let list_position = parent.getAttribute("list_position")
            let spd_mph = days_list[list_position].day.maxwind_mph
            element.innerHTML = `Max Wind Speed ${spd_mph}mph`
        })
        break
   }
}

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

function dayTemplate(day, position){
    let day_name = getDayName(day.date)
    let html = 
    `<div id="day" list_position="${position}">
        <p id="date">${day.date}</p>
        <p id="day_name">${day_name}</p>
        <img src="${day.day.condition.icon}" alt="Image of ${day.day.condition.text}">
        <p id="condition">${day.day.condition.text}</p>
        <p id="max_temp">High of ${day.day.maxtemp_f}F°</p>
        <p id="min_temp">Low of ${day.day.mintemp_f}F°</p>
        <p id="humidty">Avg. Humidty ${day.day.avghumidity}%</p>
        <p id="max_wind">Max Wind Speed ${day.day.maxwind_mph}mph</p>
        <p id="rain_chance">Rain Chance ${day.day.daily_chance_of_rain}%</p>
        <p id="snow_chance">Snow Chance ${day.day.daily_chance_of_snow}%</p>
    </div>`
    return html
}

function renderOutputData(data, output_e){
    document.querySelector("#location").innerHTML = `${data.location.name}, ${data.location.region}, ${data.location.country}`
    let html = ``
    let position = 0
    days_list = data.forecast.forecastday
    console.log(data)
    days_list.forEach(element => {
        html += dayTemplate(element, position)
        position += 1
    });
    output_e.insertAdjacentHTML("beforeend", html)
}

async function getWeatherData(){
    //Get paramater
    let paramaters = {
        location: document.querySelector("#param").value,
        days: 3,
        // days: document.querySelector("#days").value,
        // dt: document.querySelector("#dt").value
    }
    if(!paramaters.location){
        alert("Please enter a parameter into the text box")
        return
    }

    //Get output element
    const output_e = document.querySelector("#output")
    output_e.innerHTML = ""

    //Fetch info
    let url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${paramaters.location}&days=${paramaters.days}&dt=${paramaters.dt}`;
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
    } catch (error) {
        console.error(error);
    }
}

//Listen for button clicks
document.querySelector("#get-weather-button").addEventListener("click", getWeatherData)
document.querySelector("#toggle_temp").addEventListener("click", toggleTemp)
document.querySelector("#toggle_speed").addEventListener("click", toggleSpeed)