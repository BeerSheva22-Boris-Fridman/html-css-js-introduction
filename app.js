// const rectangle = new Rectangle(3, 4);
// // НОВЫЙ СИНТАКСИС:
// class Rectangle {
//     #width; //так задаем private поля 
//     #height;
//     constructor(width, height) {
//         this.#width = width;
//         this.#height = height;
//     }
//         this.square = function () {
//             return this.width * this.height;
//         };
//         this.perimetr = function () {
//             return (this.width + this.height) * 2;
//         };
// }


// class Rectangle {
//     #width;//делаем поля private
//     #height;

//     constructor(width, height) {
//         this.#width = width;//делаем поля private
//         this.#height = height;
//     }
//     square() {
//         return this.#width * this.#height;
//     }

//     perimeter() {
//         return (this.#width + this.#height) * 2;
//     }
// }
// const rectangle = new Rectangle(3, 4);

// class Square extends Rectangle{
//     constructor(width) {
//         super(width, width)
//     }
// }

// const square = new Square(10);
// console.log(square.perimeter());

// Array.prototype.map = function() {
//     console.log(this)
//     return 'kuku'
// };
// const ar = [1,2,3];
// console.log(ar.map());


// СТАРЫЙ СИНТАКСИС:
// function Rectangle(width, height) {//это конструктор
//     this.width = width;
//     this.height = height;
//     this.square = function() {
//         return this.width * this.height;
//     }
//     this.perimetr = function() {
//         return (this.width + this.height) * 2;
//     }
// }
// выносим функции из конструктора, но оставляем им this
// Rectangle.prototype.square = function () {
//     return this.width * this.height;
// }
// Rectangle.prototype.perimetr = function () {
//     return (this.width + this.height) * 2;
// }
// console.log(rectangle.square())

// let c;

// ЧТО ТАКОЕ POTOTYPE????

Array.prototype.myForEach = function (callback) {
    for (let i = 0; i < this.length; i++) {
        let element = this[i];
        callback(element, i, this)
    }
}

Array.prototype.myMap = function (callback) {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
        arr.push(callback(this[i]))
    }
    return arr;
}


Array.prototype.myFilter = function (callback) {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
        // if(callback == (this[i])) {
        if (callback(this[i])) {
            arr.push((this[i]))
        }
    }
    return arr;
}

Array.prototype.myReduce = function (callback, initialValue) {
    let accumulator = initialValue;
    let i = 0;
    if (initialValue == undefined) {
        accumulator = this[0];
        i = 1;
    }
    for (i = 0; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
}

const array = [1, 2, 3, 4, 5]

array.myForEach(element => {
    console.log(element);
});


console.log(array.myMap(item => item * 2));

console.log(array.myFilter(item => item % 2 == 0))

//console.log(array.myReduce(item => item * 2));
console.log(array.myReduce((item, i) => item + i, 's'))

class Deferred {
    ar = [];
    then(func) {
        this.ar.push(func);
    }
    resolve(el) {
        this.ar.forEach(func => el = func(rl))
    }
}


const d = new Deferred()
d.then(function (res) { console.log("1 ", res); return "a"; });
d.then(function (res) { console.log("2 ", res); return "b"; });
d.then(function (res) { console.log("3 ", res); return "c"; });
d.resolve('hello');
1  hello
2  a
3  b

