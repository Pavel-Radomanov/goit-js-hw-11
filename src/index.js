import Notiflix from 'notiflix';
import axios from "axios";

import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";
// import serviceAPI from './partials/serviceAPI.js';



const refs = {
searchForm:document.querySelector("#search-form"),
imageContainer:document.querySelector(".gallery-list"),
imageItem:document.querySelector(".gallery-item"),
// loadMoreBtn:document.querySelector(".button-load"),
// loadMoreBtn:document.querySelector('[data-action"load-more"]'),
};

refs.searchForm.addEventListener('submit',onSearchImage);
// refs.loadMoreBtn.addEventListener('click',onLoadMore);

class serviceAPI{
    constructor(){
        this.searchQuery='';
        this.page=1;
    }
 fetchAPIService() {
        console.log(this.searchQuery);
        const urlRequest = `https://pixabay.com/api/?key=31523940-001a34e6ef463768beef02e4d&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    
        return   fetch(urlRequest)
    .then(response => response.json())
    // .then(console.log)
    .then(data => {
        this.countPage();
        console.log(data);
        // extract data from promise - callback
        return data.hits
        
        // this.page += 1;
    })
    }
countPage(){
    this.page += 1;
}
resetPage(){
    this.page = 1;
}

    get query(){
        return this.searchQuery;}
    set query(newQuery){
        this.searchQuery = newQuery;
    }
}





serviceAPI = new serviceAPI();
console.log(serviceAPI);



function onSearchImage(event){
    event.preventDefault();
    serviceAPI.query=event.currentTarget.elements.searchQuery.value;
    console.log(serviceAPI.query);
    serviceAPI.resetPage();
    // return promise from fetch
    serviceAPI.fetchAPIService().then(hits => getImageCards(hits));
}


function onLoadMore(){
    serviceAPI.fetchAPIService();  
}

function getImageCards(data){
    console.log(data);

    const markup = data.map((hit) => {
        // console.log(markup);
        return `<div class="photo-card">
           
           <img src="${hit.previewURL}" alt="${hit.tags}" loading="lazy" />
           <div class="info">
    <p class="info-item">
      <b>Likes: ${hit.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${hit.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${hit.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${hit.downloads}</b>
    </p>
  </div>
</div>`
}).join('');
        //    refs.imageList.innerHTML=markup;
           refs.imageContainer.insertAdjacentHTML('beforeEnd', markup);
           console.log(markup); 
 
}
// getImageCard();

function appendImageMarkUp(hits){
    refs.imageContainer.insertAdjacentHTML('beforeend',getImageCards(hits));
}

function clearImageContainer(){
    refs.imageContainer.innerHTML='';
}







// // Bogdans fishka
// let getElement = x => document.querySelector(x);

// getElement("#search-form").addEventListener('submit', submiteImageInfo);


// let dataOfSearch;

// let searchItem="";

// function submiteImageInfo(event){
//     event.preventDefault();
//     const textInfoPicture = getElement(".input").value;
//     // textInfoPicture = event.currentTarget.elements.searchQuerry.value;
//     console.log(textInfoPicture);
//     searchItem = textInfoPicture;  
//     fetch(`https://pixabay.com/api/?key=31523940-001a34e6ef463768beef02e4d&q=${searchItem}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`)
//     .then (response => 
//         response.json())
//     .then(console.log)
    
// }

// console.log(searchItem);

 

// function fetchAPI(){
   
//     fetch(`https://pixabay.com/api/?key=31523940-001a34e6ef463768beef02e4d&q=${searchItem}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`)
//     .then (response => 
//         response.json())
//     .then(console.log)
//     // .then(getImageCard)
//     // .catch(error);
// }
// fetchAPI();
// console.log(dataOfSearch)






// function fetchCountries(name){
//     return fetch(`https://restcountries.com/v2/name/${name}?fields=name,flags,capital,population,languages`)
//     .then ((response) => {
//         console.log(response);
//      if (!response.ok){
//         console.log(response);
//         // throw new Error(response.status);
//         throw new Error(Notiflix.Notify.failure("Oops, there is no country with that name"));
//     }
//     return response.json();
//     })}








// let imageInfo;
// const textInfoPicture = document.querySelector(".input");
// const searchPicture = document.querySelector("#search-form");
 
 
//  textInfoPicture.addEventListener("input", (event) => {
//  imageInfo = event.currentTarget.value;
//  });

//   searchPicture.addEventListener("submit", handleSubmit);
//  function handleSubmit(event) {
//  event.preventDefault();
//  console.log(imageInfo);
//  };



//  textInfoPicture.addEventListener("input", (event) => {
//     imageInfo = event.currentTarget.value;
//     // console.log(imageInfo);
// //  textOutput.textContent = event.currentTarget.value;
 
// //  if (textInput.value === "") {
 
// //  textOutput.textContent = "Anonymous";
 
// //  };
//  });

// searchPicture.addEventListener("submit", handleSubmit);
 
//  function handleSubmit(event) {
//  event.preventDefault();
//  const {
//  elements: { email, password }
//  } = event.currentTarget;
 
// //  if (email.value === "" || password.value === "") {
// //  return alert("Please fill in all the fields!");
 
// //  }
// //  const formElementData = {
// //  email, password
// //  }
//  console.log(imageInfo);
// //  // console.log(`email: ${email.value}, Password: ${password.value}`);
// //  event.currentTarget.reset();
//  };

