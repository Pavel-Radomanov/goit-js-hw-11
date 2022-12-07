export default class serviceAPI{
    constructor(){
        this.searchQuery='';
        this.page=1;
    }
 fetchAPIService() {
        console.log(this.searchQuery);
        const urlRequest = `https://pixabay.com/api/?key=31523940-001a34e6ef463768beef02e4d&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
        fetch(urlRequest)
    .then(response => response.json())
    .then(data => {this.page += 1;})
    }
    get query(){
        return this.searchQuery;}
    set query(newQuery){
        this.searchQuery = newQuery;
    }
}
