
import DataGrid from './ui/DataGrid.js';
import MovieMenuBar from './ui/MovieMenuBar.js';
import RegMenuBar from './ui/RegMenuBar.js';
import config from './config/config.json' assert {type: 'json'};
import MovieDetails from './ui/MovieDetails.js';
import MovieDataService from './service/MoviesDataService.js';
import UsersService from './service/UsersDataService.js';
import RegLogForm from './ui/RegLogForm.js';
import SearchForm from './ui/SearchForm.js';
import ModalMessage from './ui/ModalMessage.js';
import Paginator from './ui/Paginator.js';
import Spinner from './ui/Spinner.js';

const FIRST_PAGE = 1;
let userId;
let searchedDataObj;

const movieMenuButtons = [
  { title: "Home", id: "movies-page-place" },
  { title: "Now playing", id: "movies-page-place" },
  { title: "Top rated", id: "movies-page-place" },
  { title: "Upcomming", id: "movies-page-place" },
  { title: "Search", id: "serch-form-place" },
  { title: "favorites", id: "movies-page-place" },
  { title: "wish list", id: "movies-page-place" },
];

const regMenuButtons = [
  { title: "Sign in", id: "regLog-form-place" },
  { title: "Log in", id: "regLog-form-place" },
  { title: "Log out", id: "movies-page-place" },
];

const movieMenu = new MovieMenuBar("movie-menu", movieMenuButtons, movieMenuHandler, ['regLog-form-place', 'logIn-form-place', 'movie-details-table-place'])
const regMenu = new RegMenuBar ("login-menu", regMenuButtons, regMenuHandler, ['movies-page-place', 'movie-details-table-place', 'serch-form-place'])

const logForm = new RegLogForm('regLog-form-place', logIn, 'Please Log in');
const regForm = new RegLogForm('regLog-form-place', createUser, 'Registration');
const searchForm = new SearchForm('serch-form-place', searchMovies, 'movies-page-place')

const moviesGrid = new DataGrid('movies-place', 'movies-page', getMovieInfo);
const movieInfo = new MovieDetails('movie-details-table-place', 'movies-page-place', moviesInfoHandler);
const modalMessage = new ModalMessage('modal-message-place');

const moviesService = new MovieDataService(config.baseUrl, config.Key, config.genresUrl, config.searchUrl);
const usersService = new UsersService(config.jsonUrl);

const paginator = new Paginator("pages-place");
const spinner = new Spinner();

//это колбек функция для класса мувиМенюБар, там она вызовется а в качестве параметра получит индекс нажатой кнопки
async function movieMenuHandler(index) {
 const menuActions = {
  0: () => getPopularMovies(FIRST_PAGE),
  1: () => getNowPlayingMovies(FIRST_PAGE),
  2: () => getTopRatedMovies(FIRST_PAGE),
  3: () => getUpcomingMovies(FIRST_PAGE),
  4: () => getGenres(),
  5: () => getMoviesFromUserList('favoriteList'),
  6: () => getMoviesFromUserList('wishList'),
 }
 menuActions[+index]();
}

async function getMovies(type, page) {
  const movies = await action(moviesService.getMovies.bind(moviesService, type, page, errorMessage));
  return movies;
}

async function getPopularMovies(page) {
  const movies = await getMovies(config.popularFilms, page);
  paginator.filldata(movies.total_pages, movies.page, getPopularMovies);
  moviesGrid.fillMovies(movies.results, config.cardImageUrl, 'Popular Movies');
}

async function getNowPlayingMovies(page) {
  const movies = await getMovies(config.nowPlayingFilms, page);
  paginator.filldata(movies.total_pages, movies.page, getNowPlayingMovies);
  moviesGrid.fillMovies(movies.results, config.cardImageUrl, 'Now Playing Movies');
}

async function getUpcomingMovies(page) {
  const movies = await getMovies(config.upcomingFilms, page);
  paginator.filldata(movies.total_pages, movies.page, getUpcomingMovies);
  moviesGrid.fillMovies(movies.results, config.cardImageUrl, 'Comming soon');
}

async function getTopRatedMovies(page) {
  const movies = await getMovies(config.topRatedFilms, page);
  paginator.filldata(movies.total_pages, movies.page, getTopRatedMovies);
  moviesGrid.fillMovies(movies.results, config.cardImageUrl, 'Top rated movies');
}

async function searchMovies(page) {
  if(!searchedDataObj){
    searchedDataObj = searchForm.getDataFromForm();
  }  
  const movies = await action(moviesService.searchMovies.bind(moviesService, searchedDataObj, !page ? 1 : page));
  paginator.filldata(movies.total_pages, movies.page, searchMovies);
  moviesGrid.fillMovies(movies.results, config.cardImageUrl, "Searching results")
}

async function getGenres() {
  searchedDataObj = undefined;
  const genres = await moviesService.getGenres();
  searchForm.fillData(genres.genres)
}



//это колбек функция для класса регМенюБар, там она вызовется а в качестве параметра получит индекс нажатой кнопки
async function regMenuHandler(index) {
  const regActions = {
   0: () => regForm.fillForm(),
   1: () => logForm.fillForm(),
   2: () => logOut(),
  }
  regActions[+index]();
}

async function moviesInfoHandler(id, filmId, collectionName) {
  const response = await action(usersService.updateUserFilms.bind(usersService, id, filmId, collectionName))
  console.log(response)
}


function logOut() {
  userId = undefined;
  movieInfo.logout()
  regMenu.logOut()
  movieMenu.logout()
}

async function createUser(userName, password) {
  const isCreated = await action(usersService.getUser.bind(usersService, userName));
  if (Object.keys(isCreated).length != 0) {
      errorMessage('There is a user with such user name')
  } else {
      const user = await action(usersService.createUser.bind(usersService, userName, password));
      if (user != undefined) {
          logIn(user.userName, user.password);
      }
  }
}

async function logIn(userName, password) {
  const user = await action(usersService.getUser.bind(usersService, userName, password));
  console.log(user);
  if (Object.keys(user).length == 0) {
      errorMessage("Wrong user name or password")
  } else {
      movieInfo.logIn(true, user[0].id);
      console.log('hello');
      regMenu.logIn(user[0].userName);
      movieMenu.logIn()
      userId = user[0].id;
  }
}



async function getMovieInfo(movieId) {
  let isFavorite = false;
  let isWish = false;
  const film = await moviesService.getMovieInfo(movieId);
  if (userId != undefined) {
    isFavorite = await checkMovie(movieId, 'favoriteList');
    isWish = await checkMovie(movieId, 'wishList');
  }
  movieInfo.fillData(film, config.cardImageUrl, isFavorite, isWish)
}



async function checkMovie(id, listName) {
  const movies = await getMoviesFromUser(listName);
  return movies.includes(+id);
}

async function getMoviesFromUser(listName) {
  const moviesId = await usersService.getMoviesFromUserList(listName, userId);
  return moviesId;
}

async function getMoviesFromUserList(listName) {
  const moviesId = await getMoviesFromUser(listName);
  console.log(listName);
  let movies = [];
  console.log(moviesId);
  movies = await Promise.all(moviesId.map(el => action(moviesService.getMovieInfo.bind(moviesService, el))));
  paginator.filldata()
  moviesGrid.fillMovies(movies, config.cardImageUrl, listName == 'favoriteList' ? 'Favorite movies' : 'Watching list')
}

function errorMessage(message) {
  modalMessage.fillData(message);
}

async function action(serviceFn) {
  spinner.start();
  try {
    const res = await serviceFn();
    return res;
  } catch(error) {
    alert(error)
  } finally {
    spinner.stop();
  }
}
// function startHomePage() {
//   movieMenuHandler(0);
//   document.getElementById('movies-page-place').hidden = false;
// }
// startHomePage();