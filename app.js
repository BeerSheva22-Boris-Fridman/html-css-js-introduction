// const person = {name: 'Vasya', id: 123, birthday: 1990, 
// adress: {country: 'Israel', city: 'Rehovot'}};

//factory function - function that create objects

function createPerson(id, name, birthday, country, city) {
    // long entry:
    // return {id: id, name: name, birthday: birthday, 
    //     adress: {country: country, city: city}}
    // short entry:
    return { id, name, birthday, adress: { country, city } };
}

const person1 = createPerson(123, 'Vasya', 1999, 'Israel', 'Rehovot');
const person2 = createPerson(123, 'Vasya', 1999, 'Israel', 'Rehovot');
console.log(`person1=person2 is ${person1 == person2}`); // "==" - is same, here we have different links

//how to get for the filds of the object? 

// we have two ways:
// way 1 

console.log(person1.name)

// way 2

// console.log(person1.id); 
// console.log(person1[id]);//here arror, becouse no brakets
// console.log(person1["id"]); //this way work

function printKeyValue(person, key) {
    //console.log(`key $ {key} is ${person.key}`)
    console.log(`key ${key} is ${person[key]}`)
}

printKeyValue(person1, 'name');
//responce: key name is Vasya

printKeyValue(person1, 'adress.city');
//responce: undefind

printKeyValue(person1, 'adress.city');
//responce: undefind

console.log(Object.keys(person1))
//responce: [ 'id', 'name', 'birthday', 'adress' ]

//--------------------------------------------------------//
//--------------------------------------------------------//

function displayKeyValue(person, key1, key2) {
    if (key2) {
        console.log(`key1 ${key1}, key2 ${key2}, value is ${person[key1][key2]}`)
    } else {
        console.log(`key ${key1} is ${person[key1]}`)
    };

}
displayKeyValue(person1, 'adress', 'country');
//Method 'keys' of Object returns array of key values
console.log("keys", Object.keys(person1));
//Method 'values' of Object returns array of values
console.log("values", Object.values(person1));
//Method 'entries' of Object returns array of arrays with key as first element and value is the second one
console.log("entries", Object.entries(person1));
const x = {};
x["ab"] = 10;
x["ab"]++;

console.log(x["ab"]);
//  function displayOccurrences(array) {
//     //array of strings
//     //display strings with their coccurency counts in the descending order of the counts
//     //if counts are equaled then in ascending string values order
//  }
//  displayOccurrences(arr) 
// const object ={};

// arr.forEach(item => {
//     //chek if this item 
//     if (object[item]){
//         object[item]++
//     } else {
//         object[item] = 1
//     }
// })

//  /*lmn -> 3
//    a -> 2
//    ab -> 2
//    c -> 1
//    d -> 1 */  



// const occurrences = {};

// // Инициализация пустого объекта, который будет содержать количество вхождений каждого элемента массива
// // Ключи объекта будут элементами массива, а значения будут соответствовать количеству вхождений
// // Начальное значение объекта occurrences: {}
// // occurrences = {}

// arr.forEach(item => {
//   // Перебор каждого элемента массива arr
//   // item - текущий элемент массива

//   if (occurrences[item]) {
//     // Если ключ item уже существует в объекте occurrences (не является undefined, null, 0 или false)
//     // Увеличиваем количество вхождений элемента, если ключ уже существует
//     occurrences[item] += 1;
//   } else {
//     // Если ключ item не существует в объекте occurrences
//     // Инициализируем количество вхождений элемента, если ключ не существует
//     occurrences[item] = 1;
//   }
// });

// // После выполнения цикла forEach объект occurrences будет содержать количество вхождений каждого элемента массива
// // Например, после выполнения цикла occurrences = { "lmn": 3, "ab": 2, "c": 1, "d": 1, "a": 2 }

// const sortedOccurrences = Object.entries(occurrences)
//   // Преобразуем объект occurrences в массив пар ключ-значение
//   // Например, Object.entries(occurrences) = [ ["lmn", 3], ["ab", 2], ["c", 1], ["d", 1], ["a", 2] ]
//   .sort(([keyA, valueA], [keyB, valueB]) => {
//     // Сортируем массив пар ключ-значение

//     if (valueA === valueB) {
//       // Если количество вхождений одинаковое, сортируем по алфавиту

//       return keyA.localeCompare(keyB);
//       // Метод localeCompare() сравнивает строки keyA и keyB лексикографически (по алфавиту)
//       // Возвращает отрицательное число, если keyA предшествует keyB
//       // Возвращает положительное число, если keyA следует за keyB
//       // Возвращает 0, если keyA и keyB равны
//     }

//     // Если количество вхождений разное, сортируем по убыванию количества вхождений

//     return valueB - valueA;
//     // Возвращаем разницу valueB и valueA
//     // Положительное значение: valueB больше valueA
//     // Отрицательное значение: valueA больше valueB
//     // 0: valueA и valueB равны
//   })
//   .reduce((sortedObj, [key, value]) => {
//     // Преобразуем отсортированный массив пар ключ-значение обратно в объект

//     sortedObj[key] = value; // Преобразование отсортированного массива пар ключ-значение обратно в объект
//     return sortedObj;
//   }, {});



function displayOccurrences(arr) {
    const occurrences = {};

    arr.forEach(item => {
        occurrences[item] ? occurrences[item]++ : occurrences[item] = 1;
    })
/* тоже самое через reduce:

const occurrences arr.reduce((obj, s) => {
    obj[s]=obj[s] ? obj[s] + 1 : 1;
    return obj;
    }, {})
*/

    const sortedOccurrences = Object.entries(occurrences).sort(([keyA, valueA], [keyB, valueB]) => {
        return valueA == valueB ? keyA.localeCompare(keyB) : valueB - valueA;
    }).reduce((sortedObj, [key, value]) => {
        sortedObj[key] = value;
        return sortedObj;
    }, {});
    return sortedOccurrences;
}

const arr = ["lmn", "ab", "lmn", "c", "d", "ab", "a", "a", "lmn"];

console.log(displayOccurrences(arr));

//  /*lmn -> 3
//    a -> 2
//    ab -> 2
//    c -> 1
//    d -> 1 */

//обращение к полю объекта:
 const y = {xx: 0}
 console.log(y.xx)

//удаление поля:
 delete y.xx;

//  function isAnagram (word, anagram) {
//     let res = false;
//     if(word.length == anagram.length) {
//         if(word.toLowerCase().split("").join() === anagram.toLowerCase().split("").join) {
//             res = true
//         }
//     }
//     return res;
//  }

 //masters solution:
 function getOccurrences (array) {
    return array.reduce((obj, s) => ({ ...obj, [s]: obj[s] ? obj[s] + 1 : 1 }), {});

 }
 
 function isAnagram (word, anagram) {
    let res = false;
    if (word.length === anagram.length) {
        wors = word.toLowerCase();
        const occurrences = getOccurrences(Array.from(word));
        res = Array.from(anagram).every(s => occurrences[s] -- > 0);
    }
    return res;
 }