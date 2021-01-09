
function showDate(timestamp){

let now = new Date(timestamp);
let days =["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let day= days[now.getDay()];
let month=months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();

return`${day}. ${month} ${date}/${year}, ${formatHours(timestamp)} `;

}

function formatHours(timestamp){
let now = new Date(timestamp);
let time = now.getHours();
let min=now.getMinutes();
if (min<10){min=`0${min}`;}
if (time<10){time=`0${time}`;}
    return `${time}:${min}`;
}



function giveCity(response){
let h2 =document.querySelector("h2");
let temperature = Math.round(response.data.main.temp);
h2.innerHTML=`${temperature}`;
document.querySelector("h1").innerHTML=response.data.name;
document.querySelector("#now-description").innerHTML =response.data.weather[0].main;

celsiusTemp=response.data.main.temp;
 minCelsius=response.data.main.temp_min;
 maxCelsius=response.data.main.temp_max;
 feelsTemp=Math.round(response.data.main.feels_like);

document.querySelector("#humidity").innerHTML=response.data.main.humidity;
document.querySelector("#wind").innerHTML=Math.round(response.data.wind.speed);
document.querySelector("#feels-like").innerHTML=Math.round(response.data.main.feels_like);
document.querySelector("#min").innerHTML=Math.round(response.data.main.temp_min);
document.querySelector("#max").innerHTML=Math.round(response.data.main.temp_max);
let time= document.querySelector("#now-info");
time.innerHTML=showDate(response.data.dt*1000);

let emoji= document.querySelector("#emoji");
 emoji.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
 
 

}

function giveForecast(response){
    console.log(response.data.list[0]);
    let forecastList= document.querySelector("#forecast");
    forecastList.innerHTML=null;
    let forecastResponse=null;

    
    for (let index = 0; index < 6; index++) {
forecastResponse=response.data.list[index];
          forecastList.innerHTML +=`<div class="col-2">
<h6>${formatHours(forecastResponse.dt*1000)}</h6>
<img src="http://openweathermap.org/img/wn/${forecastResponse.weather[0].icon}@2x.png" class="iconForecast">
<p class="forecast-temperature"> <strong>${Math.round(forecastResponse.main.temp_max)}° </strong> ${Math.round(forecastResponse.main.temp_min)}°
    </p>
</div>
</div>`;
        
    }
  
}


function searchCity(city){
let unit ="metric";
let id="e3344368d6f3c228b3b3ea166c8bbbdf";
let url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${id}`;
axios.get(url).then(giveCity);


let apiUrl=`https://api.openweathermap.org/data/2.5/forecast/?q=${city}&units=${unit}&appid=${id}`;

axios.get(apiUrl).then(giveForecast);


}


function callCity (event){
event.preventDefault();
let city=document.querySelector("#city").value;


searchCity(city);
}

function givingPosition(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(giveMyLocation);
}

function giveMyLocation(position){
    console.log(position);
let id ="e3344368d6f3c228b3b3ea166c8bbbdf";
let lat =Math.round(position.coords.latitude);
let lon =Math.round(position.coords.longitude);
let unit ="metric";
let url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${id}`;
let celsiusIconTemp= document.querySelector("h3");
celsiusIconTemp.innerHTML="℃";
let celsiusIcon=document.querySelector("#℃");
celsiusIcon.innerHTML="℃";
let celsiusIconTwo=document.querySelector("#℃two");
celsiusIconTwo.innerHTML="℃";
let feelsIcon=document.querySelector("#feels-celsius");
feelsIcon.innerHTML="℃";

axios.get(url).then(giveCity);

}

function showFar(event){
event.preventDefault();

let farConvert = (celsiusTemp * 9) / 5 + 32;;
let temperature=document.querySelector("h2");

temperature.innerHTML=Math.round(farConvert);
let farIcon= document.querySelector("h3");
farIcon.innerHTML="℉";
let minTemp=document.querySelector("#min");
minTemp.innerHTML=Math.round((minCelsius * 9) /5 + 32);
let maxTemp=document.querySelector("#max");
maxTemp.innerHTML=Math.round((maxCelsius * 9) /5 + 32);
let celsiusIcon=document.querySelector("#℃");
celsiusIcon.innerHTML="℉";
let celsiusIconTwo=document.querySelector("#℃two");
celsiusIconTwo.innerHTML="℉";
let feelsLike=document.querySelector("#feels-like");
feelsLike.innerHTML=Math.round((feelsTemp * 9) /5 + 32);
let feelsIcon=document.querySelector("#feels-celsius");
feelsIcon.innerHTML="℉";
}


function showCelsius(event){
    event.preventDefault();
let temperature=document.querySelector("h2");
temperature.innerHTML=Math.round(celsiusTemp);
let celsiusIconTemp= document.querySelector("h3");
celsiusIconTemp.innerHTML="℃";
let minTemp=document.querySelector("#min");
minTemp.innerHTML=Math.round(minCelsius);
let maxTemp=document.querySelector("#max");
maxTemp.innerHTML=Math.round(maxCelsius);
let celsiusIcon=document.querySelector("#℃");
celsiusIcon.innerHTML="℃";
let celsiusIconTwo=document.querySelector("#℃two");
celsiusIconTwo.innerHTML="℃";
let feelsLike=document.querySelector("#feels-like");
feelsLike.innerHTML=Math.round(feelsTemp);
let feelsIcon=document.querySelector("#feels-celsius");
feelsIcon.innerHTML="℃";


}


let celsiusTemp=null;
let minCelsius=null;
let maxCelsius=null;
let feelsTemp=null;



let cityForm = document.querySelector("#search-icon");
cityForm.addEventListener("submit", callCity);
document.querySelector("button").addEventListener("click", givingPosition);
let farButton = document.querySelector("#far");
farButton.addEventListener("click", showFar);
let celsiusButton = document.querySelector("#celsius");
celsiusButton.addEventListener("click", showCelsius);

searchCity("New York");