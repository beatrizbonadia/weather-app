

let now = new Date();

let days =["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let day= days[now.getDay()];
let month=months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let time = now.getHours();
let min=now.getMinutes();
let calendar=document.querySelector("#now-info");
calendar.innerHTML=`${day}. ${month} ${date}/${year}, ${time}:${min} `;





function giveCity(response){
let h2 =document.querySelector("h2");
let temperature = Math.round(response.data.main.temp);
h2.innerHTML=`${temperature}`;
document.querySelector("h1").innerHTML=response.data.name;
document.querySelector("#now-description").innerHTML =response.data.weather[0].main;
document.querySelector("#humidity").innerHTML=response.data.main.humidity;
document.querySelector("#wind").innerHTML=Math.round(response.data.wind.speed);
document.querySelector("#feels-like").innerHTML=Math.round(response.data.main.feels_like);
document.querySelector("#min").innerHTML=Math.round(response.data.main.temp_min);
document.querySelector("#max").innerHTML=Math.round(response.data.main.temp_max);
console.log(response);
}

function searchCity(city){
let unit ="metric";
let id="e3344368d6f3c228b3b3ea166c8bbbdf";
let url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${id}`;
axios.get(url).then(giveCity);

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
axios.get(url).then(giveCity);
console.log(url);
}


let cityForm = document.querySelector("#search-icon");
cityForm.addEventListener("submit", callCity);
document.querySelector("button").addEventListener("click", givingPosition);
searchCity("New York");