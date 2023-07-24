const display = document.querySelector(".display-contents")
const business = document.querySelector("#business")
const sports = document.querySelector("#sports");
const world = document.querySelector("#world");
const politics = document.querySelector("#politics");
const hatke = document.querySelector("#hatke");
const science = document.querySelector("#science");
const myNewsFeed = document.querySelector(".my-newsFeed");
const newNews = document.querySelector(".new-news");
const clear = document.querySelector(".clear");
let counter = 0;
let id = 0;

clear.addEventListener('click',function(){
    localStorage.clear();
    display.innerHTML = "";
   //  console.log("Clicked");
})

async function getUser(){
    let response = await fetch("https://content.newtonschool.co/v1/pr/64806cf8b7d605c99eecde47/news")
    let data = await response.json();
   //  console.log(data);
    return data;
}


// getUser();
function onloadData(parentElements, arr) {

   //  console.log("onload");
    parentElements.innerHTML = ""
    for (let news of arr) {
       const h2 = document.createElement("h2");
       const div = document.createElement("div");
       const div2 = document.createElement("div");
       div2.className = "bottom-newNews"
       const heart = document.createElement("div");
       heart.className = "heartbtn";
       heart.addEventListener('click',function () {
         if(heart.className == 'heartbtn'){
            heart.className = "red"
         }else{
            heart.className = 'heartbtn'
         }
       })
       div.className = "newsStyle";
       h2.textContent = `By ${news[' author']}`;
       const p = document.createElement("p");
       const link = document.createElement("p");
       p.innerHTML = `${news.content} <a href=${news.url}>READ MORE</a>`;
       const btnElements = document.createElement("button");
       btnElements.textContent = "Save News";
       btnElements.addEventListener("click", function () {
          btnElements.style.backgroundColor = "red";
          const localData = JSON.parse(localStorage.getItem("oldnews"));
          news['id'] = id++;
          if (localData && localData.length > 0) {
             localData.push(news);
 
             localStorage.setItem("oldnews", JSON.stringify(localData));
          } else {
             localStorage.setItem("oldnews", JSON.stringify([news]));
          }
       });
       div.append(h2);
       div.append(p);
       div.append(div2)
       div2.append(btnElements);
       div2.append(heart)
       parentElements.appendChild(div);
    }
 }
 function forSaved(parentElements, arr) {

   //  console.log("onload");
    parentElements.innerHTML = ""
    for (let news of arr) {
       const h2 = document.createElement("h2");
       const div = document.createElement("div");
       div.className = "newsStyle"
       div.id = news['id'];
       h2.textContent = `By ${news[' author']}`;
       const p = document.createElement("p");
       const btnElements = document.createElement("button");
       console.log(news);
       btnElements.textContent = "Delete News";
       btnElements.addEventListener('click',()=>{

         // Delete the data from localstorage
         let idToDelete = news['id'];
         const localData = JSON.parse(localStorage.getItem("oldnews"));
         let newLocalData =  [];
         for(let data of localData){
            if(data['id'] != idToDelete){
               newLocalData.push(data);
            }
         }
         // Set the updated data back to localstorage
         localStorage.setItem("oldnews", JSON.stringify(newLocalData));
         // Delete the element from UI.
         removeElement(news['id']);

       }) 
       p.innerHTML = `${news.content} <a href=${news.url}>READ MORE</a>`;
       div.append(h2);
       div.append(p);
       div.append(btnElements)
       parentElements.appendChild(div);
    }
 }
 myNewsFeed.addEventListener('click', function () {
    const dupli = JSON.parse(localStorage.getItem("oldnews"))
   //  console.log(dupli);
    if (dupli === null) {
       display.innerHTML = `Your News Feed is Empty`
    } else {
       let jsonobj = dupli.map(JSON.stringify);
       let uniq = new Set(jsonobj);
       const data = Array.from(uniq).map(JSON.parse)
       display.innerHTML = '';
       const filterElements = document.createElement("div");
       filterElements.className = 'newsStyle';
       display.append(filterElements);
       const filterData = data;
       forSaved(filterElements, filterData);
    }
 })
 newNews.addEventListener('click', function () {
    display.innerHTML = '';
    const filterElements = document.createElement("div");
    filterElements.className = 'newsStyle';
    display.append(filterElements);
    getUser().then((data) => {
       const filterData = data;
       onloadData(filterElements, filterData);
    })
})

business.addEventListener('click', function () {
   display.innerHTML = '';
   const filterElements = document.createElement("div");
   filterElements.className = 'newsStyle';
   display.append(filterElements);
   getUser().then((data) => {
      const filterData = data.filter((news) => news[' category'] === 'business');
      onloadData(filterElements, filterData);
   })
})
sports.addEventListener('click', function () {
    display.innerHTML = '';
    const filterElements = document.createElement("div");
    filterElements.className = 'newsStyle';
    display.append(filterElements);
    getUser().then((data) => {
       const filterData = data.filter((news) => news[' category'] === 'sports');
       onloadData(filterElements, filterData);
    })
 })
 world.addEventListener('click', function () {
    display.innerHTML = '';
    const filterElements = document.createElement("div");
    filterElements.className = 'newsStyle';
    display.append(filterElements);
    getUser().then((data) => {
       const filterData = data.filter((news) => news[' category'] === 'world');
       onloadData(filterElements, filterData);
    })
 })
 politics.addEventListener('click', function () {
   display.innerHTML = '';
   const filterElements = document.createElement("div");
   filterElements.className = 'newsStyle';
   display.append(filterElements);
   getUser().then((data) => {
      const filterData = data.filter((news) => news[' category'] === 'politics');
      onloadData(filterElements, filterData);
   })
})
hatke.addEventListener('click', function () {
   display.innerHTML = '';
   const filterElements = document.createElement("div");
   filterElements.className = 'newsStyle';
   display.append(filterElements);
   getUser().then((data) => {
      const filterData = data.filter((news) => news[' category'] === 'hatke');
      onloadData(filterElements, filterData);
   })
})
science.addEventListener('click', function () {
   display.innerHTML = '';
   const filterElements = document.createElement("div");
   filterElements.className = 'newsStyle';
   display.append(filterElements);
   getUser().then((data) => {
      const filterData = data.filter((news) => news[' category'] === 'science');
      onloadData(filterElements, filterData);
   })
})


/**
 * Delete the given element.
 * @param {*} id 
 * @returns 
 */
function removeElement(id) {
   var elem = document.getElementById(id);
   return elem.parentNode.removeChild(elem);
}