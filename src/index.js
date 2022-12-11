import Notiflix from 'notiflix';
import axios from "axios";

import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";
// import serviceAPI from './partials/serviceAPI.js';

const axios = require('axios').default;

const refs = {
searchForm:document.querySelector("#search-form"),
imageContainer:document.querySelector(".gallery-list"),
imageItem:document.querySelector(".gallery-item"),
// loadMoreBtn:document.querySelector(".button-load"),
loadMoreBtn:document.querySelector(".button-more"),
};

refs.searchForm.addEventListener('submit',onSearchImage);
refs.loadMoreBtn.addEventListener('click',onLoadMore);
document.getElementById('btn-more').hidden = true;

const galleryLightbox = {
    startLightbox() {
      this.galleryLightbox = new SimpleLightbox('.js-image-card a', {captionsData: 'alt',captionDelay: 250,close: false,showCounter: false,
      });
    },
  
    // refreshLightbox() {
    //   this.galleryLightbox.refresh();
    // },
  }; 
  
class serviceAPI{
    constructor(){
        this.searchQuery='';
        this.page=1;
    }
    async fetchAPIService() {
        try {
        const urlRequest = `https://pixabay.com/api/?key=31523940-001a34e6ef463768beef02e4d&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
            return await axios.get(urlRequest)
                .then(response => { 
                return response.data;
            }).then(data => {
                if (data.hits.length === 0) {
                                document.getElementById('btn-more').hidden = true;        
                                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                            }
                            else {
                                document.getElementById('btn-more').hidden = false;
                            }
                            if (data.totalHits <= this.page * 40) {
                                document.getElementById('btn-more').hidden = true; 

                                Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
                            }
                            this.countPage();
                            console.log(data);
                        //  startLightbox()   
                            
                            return data.hits
            })
        } 
        catch (error) {
            console.log(error);
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
        }
// 2-nd variant without async and axios

//  fetchAPIService() {
//         console.log(this.searchQuery);    
//         const urlRequest = `https://pixabay.com/api/?key=31523940-001a34e6ef463768beef02e4d&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`  
//         return   fetch(urlRequest)
//     .then(response => response.json())
//     // .then(console.log)
//     .then(data => {
//         if (data.hits.length === 0) {
//             document.getElementById('btn-more').hidden = true;        
//             Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//         }
//         else {
//             document.getElementById('btn-more').hidden = false;
//         }
//         if (data.totalHits <= this.page * 40) {
//             document.getElementById('btn-more').hidden = true; 
//             Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
//         }
//         this.countPage();
//         console.log(data);
//         // extract data from promise - callback
        
//         return data.hits
//         // this.page += 1;
//     })
//     .catch(error => {
//             Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//         });  
// }

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
    clearImageContainer();
    // refs.imageContainer.innerHTML = '';

    serviceAPI.query=event.currentTarget.elements.searchQuery.value.trim();
    console.log(serviceAPI.query);
    serviceAPI.resetPage();

    // return promise from fetch
    // serviceAPI.fetchAPIService().then(hits => getImageCards(hits));
    serviceAPI.fetchAPIService().then(getImageCards);
    galleryLightbox.startLightbox();
}


function onLoadMore(event){
    event.preventDefault();
    serviceAPI.fetchAPIService().then(getImageCards);  
    galleryLightbox.startLightbox();
}

function getImageCards(data){
    console.log(data);

    const markup = data.map((hit) => {
        // console.log(markup);
    return `<div class="js-image-card">
        <a href="${hit.largeImageURL}">
            <img class="js-image" src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
        </a>
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
           galleryLightbox.startLightbox();
          
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

