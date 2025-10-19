const weatherForm = document.querySelector(".weatherForm");
const cityInput=document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey="YZTAHBJ5WSFEXDCVM4FTZDBKD";
const btn=document.querySelector("button");
const err=document.querySelector(".errorDisplay");
const cityDisplay=document.querySelector(".cityDisplay");
const tempDisplay=document.querySelector(".tempDisplay");
const humidityDisplay=document.querySelector(".humidityDisplay");
const descDisplay=document.querySelector(".descDisplay");
const weatherEmoji=document.querySelector(".weatherEmoji");

const date=new Date();
const year=date.getFullYear();
const month=date.getMonth()+1;
const day=date.getDate();

function weatherData(){
    const city=cityInput.value||'mumbai';
    if(city!==''){
        cityInput.value="";
        err.textContent="";
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${year+'-'+month+'-'+day}?key=${apiKey}`)
        .then(response=>response.json())
        .then(data=>{
            displayWeather(data);
            console.log(data)
        })
        .catch(error=>err.textContent=error.message);
    }
}

function displayWeather(data){
    let {address, currentConditions:{temp, humidity, icon,conditions}}=data;
    temp=((temp-32)*5/9).toFixed(1)+"°C";
    humidity="Humidity: "+humidity.toFixed()+"%";
    console.log(address+" "+temp+" "+humidity+" "+icon+" "+conditions);
    cityDisplay.innerHTML=address;
    tempDisplay.innerHTML=temp;
    humidityDisplay.innerHTML=humidity;
    descDisplay.innerHTML=conditions;
    weatherEmoji.src=`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/refs/heads/main/PNG/3rd%20Set%20-%20Color/${icon}.png`;
}

btn.addEventListener("click", (e) => {
    e.preventDefault();
    weatherData();
});
