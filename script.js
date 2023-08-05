
const addBtn = document.getElementById('add-btn')

let weatherDetailsList = []
let citiesList = {
}

function compareByTemp(a, b) {
    return a.temp - b.temp;
}

async function fetechWeather(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=602eddacd3e14077bbcb51acfc290a2f&units=metric`
    let response = await fetch(url)
    let weatherDetails = await response.json()
    loadWetherDetails(weatherDetails)
}

function loadWetherDetails(weatherDetails){


    let weatherObj = {
        'temp': weatherDetails.main.temp,
        'temp_max': weatherDetails.main.temp_max,
        'temp_min': weatherDetails.main.temp_min,
        'city': weatherDetails.name,
        'country': weatherDetails.sys.country,
        'weatherDescription': weatherDetails.weather[0].description,
        'icon':weatherDetails.weather[0].icon
    }


    if(citiesList[weatherObj.city]!=undefined){
        alert('City already exist!')
        return
    }

    weatherDetailsList.push(weatherObj)
    citiesList[weatherObj.city] = weatherObj.temp
    weatherDetailsList.sort(compareByTemp)

    createCard()
}

function createCard(){
    const container = document.getElementsByClassName('container')[0]

    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }

    
    weatherDetailsList.forEach(weatherEle => {

        let card = document.createElement('div')
        card.className = 'card'

        let iconUrl = `https://openweathermap.org/img/wn/${weatherEle.icon}@2x.png`
        
        let singleCard = `
            <div class="left">
                <div class="temperature">
                    <div class="temp-value">${Math.trunc(weatherEle.temp)}</div>
                    <div class="degree">o</div>
                </div>
                <div class="high-low">
                    <div class="high">
                        <span class="high-temp">H:${weatherEle.temp_max}</span>
                        <span class="degree-high-low">o</span>
                    </div>
                    <div class="low">
                        <span class="low-temp">L:${weatherEle.temp_min}</span>
                        <span class="degree-high-low">o</span>
                    </div>
                </div>
                <p class="location">${weatherEle.city}, ${weatherEle.country}</p>
            </div>
            <div class="right">
                <img src=${iconUrl} alt="">
                <p class="weather-type">${weatherEle.weatherDescription}</p>
            </div>`

        card.innerHTML = singleCard

        container.appendChild(card)
    });


}

addBtn.addEventListener('click',() => {
    const cityName = document.getElementsByClassName('search-field')[0].value
    if(cityName.trim() === ''){
        alert('Please enter city')
        return
    }
    fetechWeather(cityName)
})

