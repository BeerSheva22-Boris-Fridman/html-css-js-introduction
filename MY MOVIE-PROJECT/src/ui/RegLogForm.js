export default class RegLogForm {
    #parentId;
    #callback;
    #title
    constructor (parentId, callback, title) {
        this.#parentId = parentId;
        this.#callback = callback;
        this.#title = title;
    }

    fillForm () {
        const parentElement = document.getElementById(this.#parentId);
        parentElement.innerHTML = `
        <h2 class = 'page-title'>${this.#title}</h2>
        <form class = 'reg-log-form' id = '${this.#parentId}-form'>
            <input type = 'text' class = 'form-input' placeholder = 'Enter user name' name = 'userName' required>
            <input  type = 'password' class = 'form-input' placeholder = 'Enter password' name = 'password' required>
            <button id = '${this.#parentId}-submit' class = 'submit-button'></button>
        </form>
        `;
        const formElement = document.getElementById(`${this.#parentId}-form`);
        formElement.addEventListener('submit', submitEvent => {
            submitEvent.preventDefault();
            const formData = new FormData(formElement); //создаю объект встроенного класса js для хранения в нем данных формы
            this.#callback(formData.get('userName'), formData.get('password'));
            formElement.reset();
        })
    }
}