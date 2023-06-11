import DataGrid from './ui/DataGrid.js';
import ApplicationBar from './ui/ApplicationBar.js';
import RegistrationForm from './ui/RegistrationForm.js';
import MoviesDataService from './service/MoviesDataService.js';

const sections = [
   
    {title: "Search", id: "serch-form-place"},
    {title: "favorites", id: "favorites-list-place"},
    {title: "wish list", id: "wish-list-place"},
    {title: "Sign in", id: "registration-form-place"},
    {title: "Log in", id: "logIn-form-place"},
    {title: "Log out", id: "main-place"}
];

const menu = new ApplicationBar('menu-place', sections);
const regForm = new RegistrationForm('registration-form-place');


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
 console.log(movies);
    const moviesTable = new DataGrid("main-place", [
        {field: 'title', headerName: 'Title'},
        {field: 'poster_path', headerName:'Poster'},
        // {field: 'overview', headerName: 'Overview'},
        {field: 'vote_average', headerName: 'vote_average'}
    ]);
    moviesTable.fillData(movies);
}

const form = new RegistrationForm('registration-form-place'); 

form.buttonHasPressed()
    .then(() => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const service = new MoviesDataService();
        return service.registerUser(username, password);
    })
    .catch(error => {
        alert(error.message);
    });

