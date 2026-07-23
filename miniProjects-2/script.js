const hamBurger = document.querySelector('.icon.i1');
const sideBar = document.querySelector('.sideBar');

// maine dono ko js mai target kia
hamBurger.addEventListener("click", () => {
   console.log('clicked');
   sideBar.classList.toggle("sidebarActive");
})
document.addEventListener('click', (event) => {
   console.log(event.target);
   console.log(sideBar.contains(event.target));
   console.log(hamBurger.contains(event.target))
   if (!sideBar.contains(event.target) && !hamBurger.contains(event.target)) {
      sideBar.classList.remove("sidebarActive")
   }

})
//   link.addEventListener("click", (event) => {
//     event.preventDefault();
// });
//   EK event chlalya jb bhi hamBurger click hoga toh console print clicked adn classlist toggle krke class shift to sidebar Active and fir uski css propertyl gne lagengi 
//   firr hamBurger close krne ke liye agr hamBurger and sdibar chhor kr khi bhi click hogatoh 
//   sidebar closed for which i used browser oobject fn (event) usme se ek property event.targrt use kia and pta kia ki kaha 
//   click ho rha hai and if if loop lagaya agr conditions !sidebar.contains(event.target) && !hamBurger.contains(event.target){
//    sideBar.classList.remove('sideBarActive') check kia and page reload na ho isliye preventDefault fn use kia
//   }


// navbar.............
const searchCity = document.getElementById('searchCity');
console.log("its working")
searchCity.onkeydown = function (event) {
   console.log(event.key);
   if (event.key === "Enter") {
      console.log(searchCity.value)
      const city = searchCity.value;
      async function fetchLocation(city) {
         console.log("function called")
         try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=`)
            console.log(response);
            const data = await response.json();
            console.log(data);
            console.log(data.coord.lon)
            console.log(data.coord.lat)
            let latitude = data.coord.lat
            let longitude = data.coord.lon


            mapLocation(latitude, longitude)




            if (!response.ok) {
               console.log(response.status)
            }
         }
         catch (error) {
            console.log(error)
         }
      };

      fetchLocation(city);


   }
}
const currentLocation = document.getElementById('currentLocation')
// currentLocation ka variable banya
const sideCurrentLocation = document.getElementById('sideCurrentLocation')
// sideCurrentLocation KA VARIAVLE BNAYA
navigator.geolocation.getCurrentPosition((position) => {
   //navigator browser ka object usme bhut saari data store hai unhi mai se ek hai geolocation jisme location hota hai fir geoloacation ke ander more
   // precisely hot HAI getCurrentPosition jo browswe se user ki location mangta hai fir browser user se permission mangta hai and then if yes then browswe ek fn 
   // chalata hai position jisse hm user ki location print kra sktse hai
   console.log(position);
   // POSITON KI VALUE PRINT KI
   console.log("location mil gyi")
   const latitude = position.coords.latitude
   // jo positin fn se latitude ki value mili uses store kia
   const longitude = position.coords.longitude
   // jo positin fn se longitude ki value mili uses store kia
   console.log(longitude, latitude)
   // console mai latitude and longitude ki value print ki
   async function Location(latitude, longitude) {
      //locatin name ka async fn banaua and useme latitide and longitude ki value pass ki
      try {
         //try event chalaya agr try nhi chla toh catach error chlega
         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=`)
         // response mai fetch ka promise store kia precisily await lagane se json form data mila usse response mai save kia
         console.log(response);
         // response ko console mai print kia
         if (!response.ok) {
            console.log(response.status)
         }
         // ye wla error catch chlaya hai jo api ke error ko catch krega bhr try wala error js error catch krga like net error
         // and ya ha maine data.ok nhi use kia coz data object mai and usme ye event nhi hai but reponse json mai jai usme ok feat hai
         const data = await response.json();
         console.log(data);
         // ab data object mai hai toh mai usme se name extract krunga then html mai bhej dunga
         currentLocation.innerText = data.name;
         sideCurrentLocation.innerText = data.name;
         //    dono id mai same data input de dia coz responsive mai mobile mai alg jgh use kia h
      }
      catch (error) {
         console.log(error)
         //js mai hone wli error catch krta hu isse

      }
   };
   Location(latitude, longitude);
   //functin call kia hai yaha
   rainGraph(latitude, longitude);
   forcastIcon(latitude, longitude);
   mondayFeat(latitude, longitude);
   weekdaysEditing(latitude, longitude);
   initMap(latitude, longitude);




});
const theme = document.querySelector(".theme")
const toggle = document.querySelector('.toggle');

function switchTheme() {
   document.body.classList.toggle("light-theme")
   if (document.body.classList.contains("light-theme")) {
      theme.classList.add("themeActive")
   } else {
      theme.classList.remove("themeActive")
   }

}
theme.addEventListener('click', switchTheme);
toggle.addEventListener('click', switchTheme);








// subNAV..............
const days = document.querySelectorAll('.days')
//saare days select ho gye coz ye collection in for m oof array dega but mujhe specific woh day chahiye jo click hua
days.forEach((day) => {
   //for each loop lagaya ab ye hr Element jo day ke andr hai uspe chleg and jb koi day click hoga
   day.addEventListener('click', (event) => {
      // jb day click hoga koi specificallly toh fir
      days.forEach((item) => {
         //fir se for each loop chlega iss baar item name rkha hai uske ander ke elements ka nhi toh asame name ho jata
         item.classList.remove('active')
         //uss days ke jitne element hai unn element mai se active class remove hogi
      })
      day.classList.add('active')
      //fir jo specific day click hua susme add hogi active class
      event.preventDefault();
      //since woh link hai toh page reload ho skta hai jisse prevnt default bachayega
   });

});



// forcast button
const tab = document.querySelectorAll('.tab')
const slider = document.querySelector('.btnUpper')
tab.forEach((item, index) => {
   // tab ke hr element ka kuch index hoga a nd jb click event hoga tab
   // agr index 0 pe click hua toh btnActive hta do upperBtn se jisse woh default state pea aaa jayega
   // aurr agr index 1 hua toh btnActive lga do jisse woh right shift hga
   item.addEventListener('click', () => {


      if (index === 0) {
         slider.classList.remove('btnActive')
      } else {
         slider.classList.add('btnActive')
      }

   });
});


//graph.......//
const bars = document.querySelectorAll('.actualBars')
const timeTables = document.querySelectorAll('.time')
async function rainGraph(latitude, longitude) {

   try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=`)

      console.log(response)
      if (!response.ok) {
         console.log(response.status)
      }
      const data = await response.json();
      console.log("here is temp")
      console.log(data)
      const weatherData = data.list.slice(0, 7);
      weatherData.forEach((item, index) => {

         const time = item.dt_txt.split(" ")[1];
         const hour = parseInt(time.split(":")[0]);
         const displayTime =
            hour > 12 ? `${hour - 12}PM` : hour === 12 ? "12PM" : `${hour}AM`;

         bars[index].style.height = `${item.pop * 120}px`;
         timeTables[index].textContent = `${displayTime}`;


      });

      const highTemps = [];
      const lowTemps = [];

      data.list.forEach((item) => {

         if (item.dt_txt.includes("12:00:00")) {

            highTemps.push(item.main.temp_max);
            lowTemps.push(item.main.temp_min);

         }

      });

      const highPoints = generatePoints(highTemps);

      const highPath = generatePath(highPoints);

      const fillPath = generateFillPath(highPoints);

      document
         .querySelector(".tempLine")
         .setAttribute("d", highPath);

      document
         .querySelector(".tempFill")
         .setAttribute("d", fillPath);

      renderCircles(highPoints);
   } catch (error) {
      console.log(error)
   }

};

const theDate = document.querySelectorAll('.topMonday p')[0]
const image = document.querySelector('.rightMondayImg')
async function forcastIcon(latitude, longitude) {
   try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=`)
      if (!response.ok) {
         console.log(response.status)
      }
      const data = await response.json();
      console.log(data.list[0].weather[0].icon)
      image.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
      //icon mil gya hai ab baaki cheeze

      const dateToday = data.list[0].dt_txt;
      const numDate = dateToday.split(" ")[0];
      console.log(numDate)
      const nowDate = new Date(numDate)
      const thisDay = nowDate.getDay();
      console.log(thisDay);
      const weekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      const exactDate = weekNames[thisDay]
      console.log(exactDate)
      theDate.textContent = exactDate;

      //PRINTING INCON IN WEEKDAYS TUESDAY
      console.log("its tuesday icon")
      console.log(data.list[1].weather[0].icon)
      tuesdayImg.src = `https://openweathermap.org/img/wn/${data.list[1].weather[0].icon}@2x.png`;

      //printing icon in weekdays wed
      console.log("its Wednesday icon")
      console.log(data.list[9].weather[0].icon)
      wednesdayImg.src = `https://openweathermap.org/img/wn/${data.list[9].weather[0].icon}@2x.png`;


      //printing icon in weekdays thu
      console.log("its thursday icon")
      console.log(data.list[17].weather[0].icon)
      thursdayImg.src = `https://openweathermap.org/img/wn/${data.list[17].weather[0].icon}@2x.png`;

      //printing icon in weekdays thu
      console.log("its friday icon")
      console.log(data.list[25].weather[0].icon)
      fridayImg.src = `https://openweathermap.org/img/wn/${data.list[25].weather[0].icon}@2x.png`;




   } catch (error) {
      console.log(error)
   }
   const theTime = document.querySelector('.topMonday h3')

   function currentTime() {
      const actualTime = new Date();

      const theActualHours = actualTime.getHours();
      const displayHour =
         theActualHours > 12 ? theActualHours - 12 :
            theActualHours === 0 ? 12 :
               theActualHours;

      const period = theActualHours >= 12 ? "PM" : "AM";

      const theActualMinutes = actualTime.getMinutes();

      if (theActualMinutes < 10) {
         theTime.textContent = displayHour + ":" + "0" + theActualMinutes + " " + period;
      } else {
         theTime.textContent = displayHour + ":" + theActualMinutes + " " + period;
      }
   }
   currentTime();
   setInterval(currentTime, 6000)

};
const temperature = document.querySelector('.leftMonday h1')
const wind = document.querySelectorAll('.valuesMonday')[0]
const pressure = document.querySelectorAll('.valuesMonday')[1]
const Humidity = document.querySelectorAll('.valuesMonday')[2]
const sunrise = document.querySelectorAll('.mondaySunInfo span')[0]
const sunset = document.querySelectorAll('.mondaySunInfo span')[1]
const alert1=document.querySelector('.alert.t1 p')
const alert2=document.querySelector('.alert.t2 p')
async function mondayFeat(latitude, longitude) {
   try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=`)
      console.log(response)
      const data = await response.json();

      //temp Done
      const temperatureData = parseInt(data.list[0].main.temp);
      const tempCelcius = Math.round(temperatureData - 273.15)
      temperature.textContent = tempCelcius;
      //wind
      const windSpeed = data.list[0].wind.speed;
      wind.textContent = windSpeed + "m/s"
      //humidity
      const humidity = data.list[0].main.humidity
      Humidity.textContent = humidity + "%"
      //pressure
      const pressureData = data.list[0].main.pressure
      pressure.textContent = pressureData + "hPa"
      //sunrise
      const sunriseContent = data.city.sunrise
      const sunRiseData = Math.round(parseInt(sunriseContent)) * 1000;
      const sunMorning = new Date(sunRiseData)
      sunrise.textContent = sunMorning.getHours() + ":" + sunMorning.getMinutes();
      //sunset
      const sunSetContent = data.city.sunset
      const sunSetData = Math.round(parseInt(sunSetContent)) * 1000;
      const sunEvening = new Date(sunSetData)
      sunset.textContent = sunEvening.getHours() + ":" + sunMorning.getMinutes();
  //////yaha mai notificatin add kr rha hu

const today = new Date().toISOString().split("T")[0];



//   console.log("notification")
//   console.log(data.list[6])

//   if(rainProb*100>=80){
//    alert1.textContent="It might Rain Today"
//   }else if(tempProb-273>40){
//    alert1.textContent="It might Hot day"
//   }

   } catch (error) {
      console.log(error)
   }
}


//weekdays
const weekdays = document.querySelectorAll('.weekDays')
const tuesday = document.querySelectorAll('.weekDays p')[0]
const tuesdayImg = document.querySelectorAll('.weekDays img')[0]
const tuesdayHeading = document.querySelectorAll('.weekDays h2')[0]

const wednesday = document.querySelectorAll('.weekDays p')[1]
const wednesdayImg = document.querySelectorAll('.weekDays img')[1]
const wednesdayHeading = document.querySelectorAll('.weekDays h2')[1]

const thursday = document.querySelectorAll('.weekDays p')[2]
const thursdayImg = document.querySelectorAll('.weekDays img')[2]
const thursdayHeading = document.querySelectorAll('.weekDays h2')[2]


const friday = document.querySelectorAll('.weekDays p')[3]
const fridayImg = document.querySelectorAll('.weekDays img')[3]
const fridayHeading = document.querySelectorAll('.weekDays h2')[3]

async function weekdaysEditing(latitude, longitude) {
   try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=`)
      const data = await response.json();
      console.log(data.list)

      //TUE DEFINED
      console.log(data.list[1].dt_txt)
      const dateToday = data.list[1].dt_txt
      const myDate = dateToday.split(" ")[0]
      const itsDate = new Date(myDate)
      const oohDate = itsDate.getDay();
      console.log(oohDate)
      const weekDaysAre = ["Sun", "Mon", "Tue", "wed", "Thu", "Fri", "Sat"]
      tuesday.textContent = weekDaysAre[oohDate]
      //tue temp
      console.log(data.list[1].main.temp)
      const tempData = Math.round(data.list[1].main.temp - 273.15)
      tuesdayHeading.textContent = tempData


      //wed defined
      console.log(data.list[9].dt_txt)
      const wdateToday = new Date(data.list[9].dt_txt.split(" ")[0])
      const woohDate = wdateToday.getDay();
      wednesday.textContent = weekDaysAre[woohDate]
      //wedtemp
      console.log(data.list[9].main.temp)
      const wtempData = Math.round(data.list[9].main.temp - 273.15)
      wednesdayHeading.textContent = wtempData


      //thu defined
      console.log(data.list[17].dt_txt)
      const thdateToday = new Date(data.list[17].dt_txt.split(" ")[0])
      const thoohDate = thdateToday.getDay();
      thursday.textContent = weekDaysAre[thoohDate]
      //thutemp
      console.log(data.list[17].main.temp)
      const thtempData = Math.round(data.list[17].main.temp - 273.15)
      thursdayHeading.textContent = thtempData


      //fri defined
      console.log(data.list[25].dt_txt)
      const frdateToday = new Date(data.list[25].dt_txt.split(" ")[0])
      const froohDate = frdateToday.getDay();
      friday.textContent = weekDaysAre[froohDate]
      //firTemp
      console.log(data.list[25].main.temp)
      const fridaytempData = Math.round(data.list[25].main.temp - 273.15)
      fridayHeading.textContent = fridaytempData



   } catch (error) {
      console.log(error)
   }
}

async function loadRainLayer() {
   try {
      const response = await fetch("https://api.rainviewer.com/public/weather-maps.json");
      const data = await response.json();

      const host = data.host;
      //host is the server address
      const path = data.radar.past[0].path;
//path is the latest radar folder
      const rainTileUrl = `${host}${path}/256/{z}/{x}/{y}/2/1_1.png`;
//256 is tile size
      L.tileLayer(rainTileUrl, {
         attribution: "&copy; RainViewer"
      }).addTo(map);

   } catch (error) {
      console.log(error);
   }
}
//creating Map
let map;
let marker;

function initMap(latitude, longitude) {
   map = L.map('map').setView([latitude, longitude], 4);

   L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
   }).addTo(map);
  

   marker = L.marker([latitude, longitude]).addTo(map);
   console.log("tile working")
   loadRainLayer();
}

function mapLocation(latitude, longitude) {
   map.setView([latitude, longitude], 15);
   marker.setLatLng([latitude, longitude]);
}
//leaflet library use kro aur ek map object bnao and usse map id wli html mai render kro








function generatePoints(temps) {

   const maxTemp = Math.max(...temps);
   const minTemp = Math.min(...temps);

   const svgWidth = 500;
   const svgHeight = 200;

   const leftPadding = 30;
   const rightPadding = 30;
   const topPadding = 20;
   const bottomPadding = 20;

   const graphHeight = svgHeight - topPadding - bottomPadding;
   const usableWidth = svgWidth - leftPadding - rightPadding;
   const spacing = usableWidth / (temps.length - 1);

   const points = [];

   for (let i = 0; i < temps.length; i++) {

      const currentTemp = temps[i];

      const x = leftPadding + (i * spacing);

      const y = topPadding +
         ((maxTemp - currentTemp) / (maxTemp - minTemp))
         * graphHeight;

      points.push({
         x,
         y
      });

   }

   return points;
}
function generatePath(points) {

   let path = "";

   for (let i = 0; i < points.length; i++) {

      if (i == 0) {
         path += `M ${points[i].x} ${points[i].y}`;
      }
      else {
         path += ` L ${points[i].x} ${points[i].y}`;
      }

   }

   return path;
}
function generateFillPath(points) {

   let fillPath = generatePath(points);

   const lastPoint = points[points.length - 1];
   const firstPoint = points[0];

   fillPath += ` L ${lastPoint.x} 200`;
   fillPath += ` L ${firstPoint.x} 200`;
   fillPath += " Z";

   return fillPath;
}
function renderCircles(points) {

   const group = document.querySelector(".highPoints");

   group.innerHTML = "";

   points.forEach(point => {

      const circle = document.createElementNS(
         "http://www.w3.org/2000/svg",
         "circle"
      );

      circle.setAttribute("cx", point.x);
      circle.setAttribute("cy", point.y);
      circle.setAttribute("r", 5);

      circle.setAttribute("fill", "#8B5CF6");

      group.appendChild(circle);

   });

}