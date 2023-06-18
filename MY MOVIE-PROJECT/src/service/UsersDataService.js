
export default class UsersService{
    #jsonUrl

    constructor(jsonUrl){
        this.#jsonUrl = jsonUrl; 
    }   

    async createUser(userName, password){
            const user = {userName: userName, password, 'favoriteList': [], 'wishList': []}
            const response = await fetch(this.#jsonUrl, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)
            });
            return await response.json();
    }
// создаю метод для получения списка фильмов пользователя (id) из определенного списка listName
    async getMoviesFromUserList(listName, id){ // !!!!!!!   username or pass    ?????????
        const user = await this.getUserById(id);
        return user[listName]
    }

    async getUser(userName, password){
        const response = await fetch(`${this.#jsonUrl}?userName=${userName}${password? `&password=${password}` : ''}`)
        return response.json()
    }

    async getUserById(id){
        const response = await fetch(`${this.#jsonUrl}/${id}`)
        return response.json()
    }

    async updateUserFilms(id, filmId, listName){
        const user = await this.getUserById(id);
        let moviesList = user[listName];
        moviesList.includes(filmId)? moviesList.splice(moviesList.indexOf(filmId), 1): moviesList.push(filmId); 
 
        const response = await fetch(`${this.#jsonUrl}/${user.id}`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        });

        return await response.json();
    }
}