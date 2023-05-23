//what's wrong

function sleep (timeout) {
//function sleep (timeout, ...functions) {
    //    function sleepFn (){
    //     functions.forEach(f => f())
    // }
    // setTimeout(sleepFn, timeout)
    // }
    return new Promise (resolve => setTimeout(() => resolve(), timeout));
}

function f1 () {
    console.log('f1 perfomed');
}

function f2 () {
    console.log('f2 perfomed');
}

function f3 () {
    console.log('f3 perfomed');
}

const promise = sleep(2000);
promise.then(() => f1()).then(() => f2()).then(() => f3());

function getId(predicate) {
    const ids = [123, 124, 125];
    const index = ids.findIndex(predicate);
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            return index < 0 ? reject('id not found') : resolve(ids[index]);
        }, 1000);
    })
}

function getCar(id) {
    const cars = {
        '123': 'suzuki',
        '124': 'hunday',
        '125': 'honda'
    }
    const car = cars[id];
    return new Promise((resolve,reject) => 
    setTimeout(() => car ? resolve(car) : reject('no car found'), 1000))
}

function displayCar(id) {
    getId(id => id % 10 == 0).then(id => getCar(id)).then(car => console.log(car))
    .catch(error => console.log(error));
}
displayCar()
displayCar(id => id == 125);
//sleep(2000, f1, f2, f3);

console.log('start');

setTimeout(function() {
    console.log("setTimeout message");
}, 0)

        console.log('hjkgkfkfkfj');
        console.log('hjkgkfkfkfj');
        console.log('hjkgkfkfkfj');

// arrow function
let sum = (a,b) => a+b;
// arrow function with one argument
let sum1 = a => a/2;
//arrow function without arguments
let hello = () => 'hello'
// the same function
let summ = function(a,b) {
    return a+b;
}

console.log(sum(5,5));
console.log(sum1(10));
console.log(hello());

// function ask(question, yes, no) {
//     if (confirm(question)) yes()
//     else no();
//   }
  
//   ask(
//     "Вы согласны?",
//     function() { alert("Вы согласились."); },
//     function() { alert("Вы отменили выполнение."); }
//   );

  function sayHi() {
    return ( "Привет" );
  }
  
 console.log(sayHi());; // выведет код функции
 let copySayHi = sayHi;
 console.log(copySayHi());
 console.log(sayHi());

 const age = 17;
 
 let welcome = age < 18 ? function (){console.log(a)} : function(){console.log(b)}
 const a = 'helloooooo'
 const b = 'good day'
 console.log(welcome());

 function fun1  (a,b) {
    const c = a+b;
    return fun2(c);
 }

 function fun2(c) {
    return c*10;
 }
 console.log(fun1(1,2));

 let name1 = "Вася";
function sayHi() {
  console.log(name1);
}

setTimeout(function() {
  let name1 = "Петя";
  sayHi();
}, 1000);

принимаем долготу и широту, день начала

fetch ()