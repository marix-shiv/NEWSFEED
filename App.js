const saved = document.querySelector(".saved-news");
const display = document.querySelector(".display");

saved.addEventListener("click", function () {
  // console.log("clicked");
  const dupli = JSON.parse(localStorage.getItem("oldnews"));
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
  // let news = null;
  // if (duplicate !== null) {
  //   let jsonObj = duplicate.map(JSON.stringify);
  //   let unique = new Set(jsonObj);
  //   news = Array.from(unique).map(JSON.parse);
  //   for (let newsContent of news) {
  //     const name = document.createElement("h2");
  //     const div = document.createElement("div");
  //     name.innerHTML = `By ${newsContent[" author"]}`;
  //     div.className = "newsStyle"

  //     const para = document.createElement("p");
  //     para.innerHTML = `${newsContent.content} <a hrefa=${newsContent.url}>Read More...</a>`;

  //     div.append(name);
  //     div.append(para);
  //     display.append(div)
  //   }
  // } else {
  //   const para = document.createElement("p");
  //   para.textContent = "No News Available";
  //   display.append(para);
  // }
});
function forSaved(parentElements, arr) {

  //  console.log("onload");
  //  display.innerHTML = "";
   for (let news of arr) {
      const h2 = document.createElement("h2");
      const div = document.createElement("div");
      div.className = "newsStyle"
      h2.textContent = `By ${news[' author']}`;
      const p = document.createElement("p");
      p.innerHTML = `${news.content} <a href=${news.url}>Read more....</a>`;
      div.append(h2);
      div.append(p);
      parentElements.appendChild(div);
   }
}
