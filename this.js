this.x = 100;
this.width = 1000;
this.height = 2000;
//console.log(this);
function f1() {
    return this;

}
const f2 = () => {
    return this;
}
// console.log('f1 call result', f1());
// console.log('f2 call result', f2());
// console.log((() => {
//     console.log(this);
// })());
const x = {f1: function() {
    return this;
}, f2: () => {return this}};
// console.log('x.f1 call result ', x.f1());
// console.log('x.f2 call ', x.f2());

const rectangle = {width: 20, height: 20, square: function() {
    return this.width * this.height;
}, perimeter: () => 2 * (this.width + this.height)};

const rectangle1 = {width: 20, height: 20, square: function() {
    return this.width * this.height;
}, perimeter: () => 2 * (this.width + this.height)};



console.log("squre = " + rectangle.square());
console.log("perimeter = " + rectangle.perimeter());
const point = {x: 3, y: 4};
function displayPoint(z, t) {
    console.log(`x = ${this.x}, y = ${this.y}, z = ${z}, t = ${t} `)

}
 const displayPoint1 = displayPoint.bind(point, 100, 200);
displayPoint.call(point, 200, 300);
displayPoint.apply(point, [300, 400])

console.log(rectangle1[0]); // undefined
console.log(JSON.stringify(rectangle1)[0]); // {
console.log(`rectangle1 == rectangle is ${rectangle1 == rectangle}`); // rectangle1 == rectangle is false
console.log(JSON.stringify(rectangle1) == JSON.stringify(rectangle)); // true
console.log(JSON.stringify(rectangle1)); // {"width":20,"height":20}
const rectangle2 = JSON.parse(JSON.stringify(rectangle1)); // глубокая копия, весь уровень вложенности, сначала делаем строку, потом из нее объект 
const rectangle3 = {...rectangle1}; // не глубокая копия

