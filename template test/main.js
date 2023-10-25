const api_url = "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json"

async function template_prophets(){

    const response = await fetch(api_url);
    const json = await response.json();
    let prophets = json.prophets
    console.log(prophets)

    const container = document.getElementById("prophets")
    const template = document.getElementById("prophet-card")

    for(i = 0; i < prophets.length; i += 1){
        let index = prophets[i]
        let clone = template.content.cloneNode(true)
        clone.querySelector("#full-name").innerHTML = index.name + " " + index.lastname
        clone.querySelector("#birth-date").innerHTML = index.birthdate
        clone.querySelector("#birth-place").innerHTML = index.birthplace
        clone.querySelector("#picture").src = index.imageurl
        clone.querySelector("#picture").alt = "picture of `{querySelector('#full-name').innerHTML}`"
        container.appendChild(clone)
    }
}

template_prophets();