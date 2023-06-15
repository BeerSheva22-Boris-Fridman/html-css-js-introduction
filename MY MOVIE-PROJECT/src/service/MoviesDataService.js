const genreList = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
  };

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

