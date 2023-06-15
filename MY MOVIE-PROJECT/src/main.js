
import MovieMenuBar from './ui/MovieMenuBar.js';
import RegMenuBar from './ui/RegMenuBar.js';

let userID;

const FIRST_PAGE = 1;

const movieMenuButtons = [
  { title: "Home", id: "movie-place" },
  { title: "Now playing", id: "movie-place" },
  { title: "Top rated", id: "movie-place" },
  { title: "Upcomming", id: "movie-place" },
  { title: "Search", id: "serch-form-place" },
  { title: "favorites", id: "movie-place" },
  { title: "wish list", id: "movie-place" },
];

const regMenuButtons = [
  { title: "Sign in", id: "registration-form-place" },
  { title: "Log in", id: "logIn-form-place" },
  { title: "Log out", id: "movie-place" },
];

const movieMenu = new MovieMenuBar("movie-menu", movieMenuButtons, movieMenuHandler, ['registration-form-place', 'logIn-form-place', 'movie-details-table-place'])
const registrationMenu = new RegMenuBar ("login-menu", regMenuButtons, regMenuHandler, ['movie-place', 'movie-details-table-place', 'serch-form-place'])

//это колбек функция для класса мувиМенюБар, там она вызовется а в качестве параметра получит индекс нажатой кнопки
async function movieMenuHandler(index) {
 const actions = {
  0: () => getPupularMovies(FIRST_PAGE),
  1: () => getNowPlayingMovies(FIRST_PAGE),
  2: () => getTopRatedMovies(FIRST_PAGE),
  3: () => getUpcomingMovies(FIRST_PAGE),
  4: () => getSearchMovieList(), //почему тут не нужно передавать страницу???
  5: () => getUsersFavoritesList('favoriteList'),
  6: () => getUsersWishList('wishList')
 }
 actions[+index]();
}

async function regMenuHandler(index) {
  const actions = {
   0: () => getPupularMovies(FIRST_PAGE),
   1: () => getNowPlayingMovies(FIRST_PAGE),
   2: () => getTopRatedMovies(FIRST_PAGE),
   3: () => getUpcomingMovies(FIRST_PAGE),
   4: () => getSearchMovieList(), //почему тут не нужно передавать страницу???
   5: () => getUsersFavoritesList('favoriteList'),
   6: () => getUsersWishList('wishList')
  }
  actions[+index]();
 }