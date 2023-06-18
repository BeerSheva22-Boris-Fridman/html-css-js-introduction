 
export default class MovieMenuBar {
    #movieMenuButtons; //array of buttons
    #favoritesButton;
    #wishListButton;
    #sectionsElements; // array of element that will be opent when buttons wil be pressed
    #activeIndex;
    #hiddenElements;
    #callback
    constructor(parentId, movieMenuButtons ,callback, hiddenElements) {
        this.#fillButtons(parentId,movieMenuButtons.map(titles => titles.title)); // метод получает id секции куда будут помещаться кнопки и массив с названиями из массива который находится в мейне
        this.#setSectionsElement(movieMenuButtons.map(sectionIds => sectionIds.id)); // метод получает массив id для каждой кнопки 
        this.#addListeners();
        this.#hiddenElements = hiddenElements; // сохраняю значение в свойствах экземпляра класса, чтобы иметь доступ к ним в любом методе и не передавать в аргументах
        this.#callback = callback; // это функция movieMenuHandler из мейна
    }
//создаю кнопки
    #fillButtons(parentId, titles) {
        const parentElement = document.getElementById(parentId);//создаю константу в который будут размещены кнопки используя заранее заготовленный идентификатор
        //создаю кнопки мапируя массив названий, каждой кнопке присваиваю класс и уникальный id
        parentElement.innerHTML = titles.map(title => `<button class ="menu-button" id = "${title.toLowerCase().replace(" ", "-")}">${title}</button>`).join('');
        //проверяю, что элемент существует и прячу его (виш лист и фейворитс)
        this.#movieMenuButtons = parentElement.childNodes;
        this.#favoritesButton = document.getElementById('favorites')
        this.#favoritesButton.hidden = true;
        this.#wishListButton = document.getElementById('wish-list')
        this.#wishListButton.hidden = true;
    }
// создаю массив элементов которые должны открывать кнопки
    #setSectionsElement(sectionIds) {
        this.#sectionsElements = sectionIds.map(id => document.getElementById(id));
    }

    #addListeners() {
        this.#movieMenuButtons.forEach((button, index) => {
            button.addEventListener('click', this.#handler.bind(this, index))    
        });
    }

    async #handler(index) {
        //console.log(index);
        // проверяю если кнопка
        if (this.#activeIndex != undefined) {
            this.#movieMenuButtons[this.#activeIndex].classList.remove('active');
            this.#sectionsElements[this.#activeIndex].style.display = 'none';
        }
        this.#hiddenElements.forEach(element => document.getElementById(element).style.display = 'none');
        this.#movieMenuButtons[index].classList.add('active');
        await this.#callback(index);
        this.#sectionsElements[index].style.display = 'flex';
        this.#activeIndex = index;
    }
    
    logIn() {
        console.log(this.#wishListButton);
        this.#wishListButton.hidden = false;
        this.#favoritesButton.hidden = false;
    }

    logOut() {
        this.#wishListButton.hidden = true;
        this.#favoritesButton.hidden = true;       
    }

}