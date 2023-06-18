export default class MovieDetails {
  #parentId;
  #buttons;
  #mainPage;
  #logIn;
  #userId;
  #callback;
  #filmId;
  
  
  constructor(parentId, mainPage, callback) {
      this.#parentId = parentId;
      this.#mainPage = mainPage;
      this.#buttons = [];
      this.#logIn = false;
      this.#callback = callback; //добавление фильма в список
    }

    fillData (movie, imageUrl, isFavorite, isWish) {
      this.#filmId = movie.id;
      //включаю отображение формы
      document.getElementById(this.#parentId).style.display = 'flex';
      const parentElement = document.getElementById(this.#parentId);
      //получаю массив наименований жанров (name), так как в фильме может быть отмечено несколько жанров сразу
      const genres = movie.genres.map(genre => genre.name);

      parentElement.innerHTML = `

      <div class='${this.#parentId}-img'>
        <img src = '${movie.poster_path != null ? imageUrl + movie.poster_path: './src/images/nophoto.jpg'}'>
      </div>

      <div class = '${this.#parentId}-container'>

        <h1 class= '${this.#parentId}-title'>${movie.title}</h1>
        <h3 class='${this.#parentId}-tagline'>${movie.tagline}</h3>

        <div class ='${this.#parentId}-genres'>${genres}</div>
        <div class='${this.#parentId}-genres'>Release date: ${movie.release_date}</div>
        <div class='${this.#parentId}-budget'>Budget: ${movie.budget}</div>
        <div class='${this.#parentId}-raiting'>Raiting: ${movie.popularity}</div>
        <div class='${this.#parentId}-overview'> Overview: ${movie.overview}</div>
      
        <div id='${this.#parentId}-buttons'>
          <button id ='${this.#parentId}-favoriteList-add-btn' class='${this.#parentId}-button' 
          value ='favoriteList' ${!this.#logIn ? 'disabled' : ''} ${isFavorite? 'hidden': ''}>Add to favorites</button>

          <button id ='${this.#parentId}-favoriteList-remove-btn'  class='${this.#parentId}-button' 
          value ='favoriteList' ${isFavorite? '': 'hidden'}>Remove from favorites</button>

          <button id ='${this.#parentId}-wishList-add-btn'  class='${this.#parentId}-button' 
          value ='wishList' ${!this.#logIn ? 'disabled' : '' } ${isWish? 'hidden': ''}>Add to wish list</button>

          <button id ='${this.#parentId}-wishList-remove-btn' class='${this.#parentId}-button' 
          value ='wishList' ${isWish? '': 'hidden'}>Remove from wish list</button>

          <button class='${this.#parentId}-button' value ='back'>Back to films</button>
        </div>

      </div>
      `;
    //создаю массив кнопок
    this.#buttons = document.getElementById(`${this.#parentId}-buttons`).childNodes;
    this.#addListeners();
  }

  #addListeners() {
    this.#buttons.forEach(button => button.addEventListener('click', this.#handler.bind(this, (button.value))));
  }

  #handler(buttonValue) {
    if (buttonValue == 'back') {
      document.getElementById(this.#parentId).style.display = 'none';
      document.getElementById(this.#mainPage).style.display = 'flex';
    }else{
      this.#callback(this.#userId, this.#filmId, buttonValue); //value is optional - 'favoriteList'/'wishList'
      const addbutton = document.getElementById(`${this.#parentId}-${buttonValue}-add-btn`);
      const removebutton = document.getElementById(`${this.#parentId}-${buttonValue}-remove-btn`);
      addbutton.hidden?  addbutton.hidden = false: addbutton.hidden = true;
      removebutton.hidden? removebutton.hidden = false: removebutton.hidden = true;
    }
  }

  logIn(state, userId) {
    this.#logIn = state;
    this.#userId = userId;
  }

  logout(state) {
    this.#logIn = state;
  }


  }