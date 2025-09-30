const weatherForm = document.querySelector(".weatherForm");
const cityInput=document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey="YZTAHBJ5WSFEXDCVM4FTZDBKD";

const date=new Date();
const year=date.getFullYear();
const month=date.getMonth()+1;
const day=date.getDate();

weatherForm.addEventListener("submit",async event=>{
    event.preventDefault();
    const city = cityInput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.log(error);
            displayError(error);
        }
    }
    else{
        displayError("Enter a city");
    }
});

function getWeatherData(city){
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${year}-${month}-${day}?key=${apiKey}`;
    
    return fetch(apiUrl)
        .then(response=>{
            if(!response.ok){
                throw new Error("Could not fetch weather data");
            }
            return response.json();
        })
        .catch(error=>displayError(error));
}

function displayWeatherInfo(data){
    console.log(data);
    const {
    address, 
    currentConditions: {
      temp, 
      humidity, 
      conditions, 
      icon
    }
  } = data;
  

    card.textContent="";
    card.style.display="flex";
    
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("img");

    cityDisplay.textContent=address.charAt(0).toUpperCase()+address.slice(1).toLowerCase();
    tempDisplay.textContent=`${((temp-32)/9*5).toFixed(1)}°C`;
    humidityDisplay.textContent=`Humidity: ${humidity.toFixed(0)}%`;
    descDisplay.textContent=`${conditions}`;
    weatherEmoji.src=`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/refs/heads/main/PNG/3rd%20Set%20-%20Color/${icon}.png`;  

    cityDisplay.className="text-5xl font-bold";
    humidityDisplay.className="font-bold text-2xl mb-[25px] italic";
    descDisplay.className="font-bold text-2xl";
    weatherEmoji.className="m-0 h-[125px]";
    tempDisplay.className="pt-2 text-[26px]";
    
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function displayError(message){
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("errorDisplay");
    console.log(message);

    card.textContent = "";
    card.style.display="flex";
    card.appendChild(errorDisplay);
}