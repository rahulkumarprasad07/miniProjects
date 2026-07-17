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

searchCity.addEventListener('keydown', (event) => {
   console.log(event.key);
   if (event.key === "Enter") {
      console.log(searchCity.value)
      const city = searchCity.value;
      async function fetchLocation(city) {
         try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=`)
            console.log(response);
            const data = await response.json();
            console.log(data);
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
})
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
      days.forEach((item)=>{
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
const tab=document.querySelectorAll('.tab')
const slider=document.querySelector('.btnUpper')
tab.forEach((item,index)=>{
   // tab ke hr element ka kuch index hoga a nd jb click event hoga tab
   // agr index 0 pe click hua toh btnActive hta do upperBtn se jisse woh default state pea aaa jayega
   // aurr agr index 1 hua toh btnActive lga do jisse woh right shift hga
item.addEventListener('click',()=>{


if(index===0){
   slider.classList.remove('btnActive')
}else{
   slider.classList.add('btnActive')
}

});
});




