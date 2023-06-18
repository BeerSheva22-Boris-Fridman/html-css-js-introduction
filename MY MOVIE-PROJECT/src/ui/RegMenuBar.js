 
export default class RegMenuBar {
    #regMenuButtons; //array of buttons
    #sectionElements; // array of element that will be opent when buttons wil be pressed
    #activeIndex;
    #hiddenElements;
    #callback
    constructor(parentId, regMenuButtons ,callback, hiddenElements) {
        this.#fillButtons(parentId,regMenuButtons.map(titles => titles.title)); // метод получает id секции куда будут помещаться кнопки и массив с названиями из массива который находится в мейне
        this.#setSectionsElement(regMenuButtons.map(sectionIds => sectionIds.id)); // метод получает массив id для каждой кнопки 
        this.#addListeners();
        this.#hiddenElements = hiddenElements; // сохраняю значение в свойствах экземпляра класса, чтобы иметь доступ к ним в любом методе и не передавать в аргументах
        this.#callback = callback; // это функция regMenuHandler из мейна
        document.getElementById('log-out').hidden = true
    }
//создаю кнопки
    #fillButtons(parentId, titles) {
        const parentElement = document.getElementById(parentId);//создаю константу в который будут размещены кнопки используя заранее заготовленный идентификатор
        //создаю кнопки мапируя массив названий, каждой кнопке присваиваю класс и уникальный id
        parentElement.innerHTML = titles.map(title => `<button class ="reg-button" id = "${title.toLowerCase().replace(" ", "-")}">${title}</button>`).join('');
        this.#regMenuButtons = parentElement.childNodes;
    }

// создаю массив элементов которые должны открывать кнопки
    #setSectionsElement(sectionIds) {
        this.#sectionElements = sectionIds.map(id => document.getElementById(id));
    }

    #addListeners() {
        this.#regMenuButtons = Array.from(this.#regMenuButtons)
        this.#regMenuButtons.forEach((button, index) => {
            button.addEventListener('click', this.#handler.bind(this, index))    
        });
    }

    async #handler(index) {
        // проверяю если кнопка
        if (this.#activeIndex != undefined) {
            this.#regMenuButtons[this.#activeIndex].classList.remove('active');
            this.#setSectionsElement[this.#activeIndex].style.display = 'none';
        }

        // console.log(document.getElementById(this.#hiddenElements[2]));
        this.#hiddenElements.forEach(element => document.getElementById(element).style.display = 'none');
        this.#regMenuButtons[index].classList.add('active');
        await this.#callback(index);
        this.#sectionElements[index].style.display = 'flex';
        this.#activeIndex = index;
    }
    
    logIn() {
        this.#regMenuButtons.map(button => button.hidden? button.hidden = false : button.hidden = true);
        document.getElementById("regLog-form-place").style.display = 'none';
    }

    logOut() {
        this.#regMenuButtons.map(button => button.hidden? button.hidden = false : button.hidden = true); 
    }

}