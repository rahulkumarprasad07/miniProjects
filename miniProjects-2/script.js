const hamBurger = document.querySelector('.icon.i1');
const sideBar = document.querySelector('.sideBar');
// maine dono ko js mai target kia
 hamBurger.addEventListener("click",()=>{
  console.log('clicked');
  sideBar.classList.toggle("sidebarActive");
 })
 document.addEventListener('click',(event)=>{
    console.log(event.target);
 console.log(sideBar.contains(event.target));
  console.log(hamBurger.contains(event.target))
 if(!sideBar.contains(event.target) && !hamBurger.contains(event.target)){
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
const locationInput=document.getElementById('locationSearch')
locationInput.addEventListener('keydown',(event)=>{
   console.log(event.key);
   if(event.key==="Enter"){
      console.log(locationInput.value)
      const city=locationInput.value;
      async function fetchLocation(city){
         const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=418c162c9bae3aa711f28518e1117cc4`)
          console.log(response);
          const data=await response.json();
          console.log(data);
      };
      fetchLocation(city);
     
   }
})