const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 p img");
const weatherField = document.querySelector(".weather3 span");
const searchField= document.querySelector(".searchField");
const form = document.querySelector("form");

form.addEventListener("submit", search);

let target= "patna";

const fetchData = async(target) => {
try{
const url= `https://api.weatherapi.com/v1/current.json?key=153ced2369c740778e0135313231002&q=${target}`;

const response = await fetch(url);
const data= await response.json();

const {
    current: {
       temp_c,
       condition: {text, icon},
    },
    location:{name,localtime},
} = data;

updateDom(temp_c, name, localtime, icon, text);
} catch (error) {
    alert("Location not found");
 }
};

function updateDom(temp, city, time, emoji, text){
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = getDayName(new Date(exactDate).getDay());

    temperatureField.innerText= temp;
    cityField.innerText = city;
    dateField.innerText= `${exactTime}- ${exactDay} ${exactDate}`;
    emojiField.src = emoji;
    weatherField.innerText = text;
}

fetchData(target);

function search(e) {
    e.preventDefault();
    target = searchField.value;
    fetchData(target);
};

function getDayName(num) {
    switch (num) {
      case 0:
        return "Sun";
  
      case 1:
        return "Mon";
  
      case 2:
        return "Tue";
  
      case 3:
        return "Wed";
  
      case 4:
        return "Thu";
  
      case 5:
        return "Fri";
  
      case 6:
        return "Sat";
  
      default:
        return "Not valied";
    }
}

