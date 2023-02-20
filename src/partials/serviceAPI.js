export default class 
 serviceAPI{
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
                            console.log(data.total);
                            const totalHits = data.total
                            Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
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


// serviceAPI{
//     constructor(){
//         this.searchQuery='';
//         this.page=1;
//     }
//  fetchAPIService() {
//         console.log(this.searchQuery);
//         const urlRequest = `https://pixabay.com/api/?key=31523940-001a34e6ef463768beef02e4d&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
//         fetch(urlRequest)
//     .then(response => response.json())
//     .then(data => {this.page += 1;})
//     }
//     get query(){
//         return this.searchQuery;}
//     set query(newQuery){
//         this.searchQuery = newQuery;
//     }
// }
