
import DataGrid from './ui/DataGrid.js';
import ApplicationBar from './ui/ApplicationBar.js';
import RegistrationForm from './ui/RegistrationForm.js';
import MoviesDataService from './service/MoviesDataService.js';
import MovieDetails from './ui/MovieDetails.js';

const sections = [
  { title: "Search", id: "serch-form-place" },
  { title: "favorites", id: "favorites-list-place" },
  { title: "wish list", id: "wish-list-place" },
  { title: "Sign in", id: "registration-form-place" },
  { title: "Log in", id: "logIn-form-place" },
  { title: "Log out", id: "main-place" }
];

const menu = new ApplicationBar('menu-place', sections);
const regForm = new RegistrationForm('registration-form-place');
const movieDetails = new MovieDetails('movie-details-table-place');

document.addEventListener('DOMContentLoaded', function () {
  fetchMovies();
});

function fetchMovies() {
  fetch('https://api.themoviedb.org/3/movie/popular?api_key=2c46288716a18fb7aadcc2a801f3fc6b')
    .then(response => response.json())
    .then(data => populateMovies(data.results))
    .catch(error => console.error('Error:', error));
}

function populateMovies(movies) {
  const moviesTable = new DataGrid("main-place", [
    { field: 'title', headerName: 'Title' },
    { field: 'poster_path', headerName: 'Poster' },
    { field: 'release_date', headerName: 'Release Date' },
    { field: 'vote_average', headerName: 'Rating' }
  ]);
  moviesTable.fillData(movies);

  // moviesTable.addClickListener(movie => {
  //   movieDetails.displayMovieDetails(movie);
  // });

  function rowClickCallback(event) {
    // Get the clicked row
    const clickedRow = event.currentTarget;

    // Access the data associated with the clicked row
    const rowData = clickedRow.dataset.movieData;

    // Perform any desired actions with the rowData
    console.log('Clicked row data:', rowData);
    movieDetails.displayMovieDetails(rowData);
    const mainPlace = document.getElementById('main-place');
    mainPlace.style.display = 'none';
    const movieTable = document.getElementById('movie-details-table-place');
    movieTable.style.display = 'block';
  }

// Add the callback function to the click event of the table rows
  const tableRows = document.querySelectorAll('tr');
  tableRows.forEach(row => {
    row.addEventListener('click', rowClickCallback);
  });
}

const registrationForm = new RegistrationForm('registration-form-place');

registrationForm.buttonHasPressed()
  .then(() => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const service = new MoviesDataService();
    return service.registerUser(username, password);
  })
  .catch(error => {
    alert(error.message);
  });