export default class RegistrationForm {
    #buttonElement;
    #parentElement
    constructor(parentId){
      this.#parentElement = document.getElementById(parentId);
      this.#fillSection()
      this.#buttonElement = document.getElementById('reg-button-id')
    }
     #fillSection () {
        this.#parentElement.innerHTML = `
        <form id="registration-form">
          <div>
            <label for="username">Login:</label>
            <input type="text" id="username" name="username" required>
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
          </div>
         <button type="submit" id="reg-button-id">Register</button>
        </form>
        `
     }
     buttonHasPressed() {
        return new Promise(resolve => {
            this.#buttonElement.onclick = () => {
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                resolve();
            };
        });
    }
}