const hamBurger = document.querySelector('.icon.i1');
const sideBar = document.querySelector('.sideBar');
 hamBurger.addEventListener("click",()=>{
  console.log('clicked');
  sideBar.classList.toggle("sidebarActive");
 })
 document.addEventListener('click',(event)=>{
    console.log(event.target);
 })