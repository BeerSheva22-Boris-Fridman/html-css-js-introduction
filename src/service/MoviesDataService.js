export default class MoviesDataService {
    registerUser(username, password) {
        return new Promise((resolve, reject) => {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Проверка на существование пользователя с тем же именем
            const userExists = users.find(user => user.username === username);
            if (userExists) {
                reject(new Error('User already exists'));
            } else {
                const newUser = { 
                    username, 
                    password,
                    wishList: [], 
                    favorites: []
                };

                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                
                resolve(newUser);
            }
        });
    }
}

