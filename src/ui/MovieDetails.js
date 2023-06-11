export default class MovieDetails {
    constructor(parentId) {
      this.parentId = parentId;
    }
  
    displayMovieDetails(movie) {
      const imageUrl = "https://image.tmdb.org/t/p/w500/" + movie.poster_path;
      const movieDetailsElement = document.getElementById(this.parentId);
      const movieDetails = `
        <h2>${movie.title}</h2>
        <img src="${imageUrl}" alt="Постер фильма" style="width: 200px;">
        <p>Release_date: ${movie.release_date}</p>
        <p>Rating: ${movie.vote_average}</p>
        <p>Overview: ${movie.overview}</p>
      `;
      movieDetailsElement.innerHTML = movieDetails;
    }
  }