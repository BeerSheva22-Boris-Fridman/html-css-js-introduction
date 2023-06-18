export default class MovieDataService {
    #apiKey;
    #baseUrl;
    #genresUrl
    #searchUrl

    constructor (baseUrl, apiKey, genresUrl, searchUrl) {
        this.#apiKey = apiKey;
        this.#baseUrl = baseUrl;
        this.#genresUrl = genresUrl;
        this.#searchUrl = searchUrl;
    }

    async getMovies (moviesType, page, errorMessage) {
        const response = await fetch(this.#baseUrl + moviesType + page + this.#apiKey)
        if (response.ok) {
           
            return await response.json();
            
        } else {
            response.json().then(responseData => errorMessage(responseData.errors))
        }
    }

    async getMovieInfo(movieId) {
        const response = await fetch(this.#baseUrl + '/' + movieId + '?language=en-US' + this.#apiKey)
        return response.json();
    }

    async getGenres() {
        const response = await fetch(this.#genresUrl + this.#apiKey);
        return response.json();
    }

    async searchMovies (searchedDataObj, page) {
        const parameters = `page=${page}${searchedDataObj.year != ''? `&primary_release_year=${searchedDataObj.year}`:''}${searchedDataObj.genre != ''? `&with_genres=${searchedDataObj.genre}`:''}${searchedDataObj.company? `&with_companies=${searchedDataObj.company}`: ''}&sort_by=popularity.desc${this.#apiKey}`;
        const response = await fetch(this.#searchUrl + parameters);
        return response.json();
    }

}
