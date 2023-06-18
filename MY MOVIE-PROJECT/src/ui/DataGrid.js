export default class DataGrid {
   #moviesPlace
   #parentId
   #moviesPlaceId
   #moviesCallback
   #movies
 
   
   constructor(parentId, moviesPlaceId, moviesCallback, ){
      //parentId - 'movie-place'
      //moviesPlaceId - 'movies-place'
      //moviesCallback - колбек который будет определять данные, необходимые для использования при клике по фильму)
      this.#parentId = parentId;
      this.#moviesPlaceId = moviesPlaceId;
      this.#moviesCallback = moviesCallback;
      this.#buildMoviePlace(moviesPlaceId);//создаю элемент в котором будут размещаться фильмы
      this.#movies = [];    //массив с карточками фильмов
   }
//
   #buildMoviePlace(){ //метод просто создает переменную в которой храниться элемент в котором будут размещены фильмы
      this.#moviesPlace = document.getElementById(this.#parentId);
   }
   //отрисовка названия страницы, данный метод будет вызываться в методе fillMovies,
   //а он в свою очередь будет вызываться из мейна и будет принимать  в том числе и title
   #buildPageTitle(title) {
      let res;
      title? res = `<h2 class = 'page-title'>${title}</h2>` : res = `<h2 class = 'page-title'>Home page</h2>`;
      return res;
   }

//    #buildTitle(title){
//       let res;
//       title? res =`<h2 class = 'page-title'>${title}</h2>`: res = ''
//       return res;
//   }

   fillMovies(movies, imageUrl, title) { 
   //movies - объект мувис, в котором содержаться все фильмы
   //imageURL - начало ссылки для получения картинки
   //title - название страницы (Популярные, Результат поиска, Топовые итд...)
   // const titleElement = document.getElementById(`${this.#parentId}-title`);
   // titleElement.innerHTML = this.#buildPageTitle(title);
// console.log(this.#moviesPlaceId);
      document.getElementById(`${this.#moviesPlaceId}-title`).innerHTML = this.#buildPageTitle(title);
      
       this.#moviesPlace.innerHTML = movies.map(movie => this.#createMovieCard(movie, imageUrl)).join('') 
      // беру все фильмы, достаю каждый фильмь и вызываю метод построения карточки фильма в который передаю этот фильм и адрес для картинки, 
      //далее склеиваю все карточки в  строку и помещаю в блок для фильмов. записываю все это в константу parentElement
     // console.log(document.getElementById(this.#moviesPlaceId));
      const parentElement = document.getElementById(this.#parentId)
      //создаю переменную в которой будет находится массив карточек фильмов
      console.log(parentElement);
      this.#movies = parentElement.childNodes;
      this.#movieCardsAddListener();
   }

   #createMovieCard(movie, imageUrl) {
      //присвоение id из айдишника фильма
      return `<div class = "movie-card" id='${movie.id}' data="movie-card"> 
      <img src = ${movie.poster_path != null? imageUrl + movie.poster_path: './src/images/nophoto.jpg'} class ="movie-card-img"/>
      <div class ="film-card-title"> ${movie.title}</div>
      <div class = "film-card-date">Year: ${movie.release_date.slice(0, 4)}</div>
  </div> `
   }

   removeEverithyng(){
      this.#moviesPlace.innerHTML = '';
      document.getElementById(`${this.#parentId}-title`).innerHTML='';
  }

   #movieCardsAddListener() {
      this.#movies.forEach(card => {
       card.addEventListener('click', this.#movieCardHendler.bind(this, (card.id))) //card.id - это id карточки в html, но этот id также равен id фильма который находится в этой карточке
      })
   }

   #movieCardHendler(cardId) {
      document.getElementById(`${this.#moviesPlaceId}-place`).style = 'none';
      this.#moviesCallback(cardId);
   }
   
   showHomePage(){
   
       document.getElementById(`movies-page-place`).style.display = 'flex';  
   }

}