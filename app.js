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


class Rectangle {
    #width;//делаем поля private
    #height;
    
    constructor(width, height) {
        this.#width = width;//делаем поля private
        this.#height = height;
    }
    square() {
        return this.#width * this.#height;
    }
    
    perimeter() {
        return (this.#width + this.#height) * 2;
    }
}
const rectangle = new Rectangle(3, 4);

class Square extends Rectangle{
    constructor(width) {
        super(width, width)
    }
}

const square = new Square(10);
console.log(square.perimeter());

Array.prototype.map = function() {
    console.log(this)
    return 'kuku'
};
const ar = [1,2,3];
console.log(ar.map());




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
