// const ar = [];
// ar[10] = 100;
// ar [0] = 'hello';
// ar[3] = [];
// ar.length = 0;
// ar[0] = 1;
// const ar2 = [[1,6], [2,0,0], [3, 1]];
// //add at array end
// ar[ar.length] = 10;
// let s = ar.push(...ar2);
// ar[10];
// //method "map"

// let ar1 =[];
// ar1.push(1, 2, 3);
// ar1.length = 100;
// ar1 = [...ar1]

// ar1.length = 5;
// //console.log(ar1)



//написать функцию которая возвращае случайное целое число в заданном диапазоне
function getRandomIntNumber(min, max, minInclusive = true, maxIninclusive = false) {
    min = Math.round(min);
    max = Math.round(max);
    
    if (!minInclusive) min++;
    if (maxIninclusive) max++;
    return min < max ? Math.round(Math.random() * (max - min) + min) : undefined;
    
}
// console.log(getRandomIntNumber(2.2, 10.5));

//написать функцию которая вернет массив случайных чисел используя метод map и getRandomIntNumber, которую мы реализуем выше
function getArrayRandomIntNumbers(nNumbers, min, max, minInclusive = true, maxIninclusive = false) {
    const arr = [];
    arr.length = nNumbers;
    return [...arr].map(() => getRandomIntNumber(min, max, minInclusive, maxIninclusive));
}
// console.log(getArrayRandomIntNumbers(5, 1, 10));

//     //returns HTML string of element <ol> with items form 
//     //a given array elements
//     //example: input- [1, 2, 3]
//     //output "<ol><li>1</li><li>2</li><li>3</li></ol>"
// console.log([1, 2, 3].join(''))
 
function getOrderedList(array) {
     const listItems = array.map(item => `<li>${item}</li>`).join('');
     return `<ol>${listItems}</ol>`;
    }
    
    const array = ["First", "Second", "Third"];
    console.log(getOrderedList(array));

//Explanation in english:
    // using the map method, I convert each element of the array into a string <li>, 
    //then using the join method, I join the strings without a separator. 
    //then in the return I use a template literal to wrap the result in an <ol> tag

//Explanation in hebru:
    // ахшав ани асбир эйх шита гетордерлист овед
    // еш ли мештанэ лист айтемс , бе мештанэ ха зе еш а коль элементим ме аррэй им тег ли. 
    // ани мештамеш метотодим мап вэ джоин, вэ ахар ках ани мештамеш темплейт литерал кеде лехасиф тег ол

   // задание классная работа 11/05/22
   // вместо 1 и 0 нарисовать квадратики единица - черный цвет, ноль -белый


   function getSquareOrderedList(array) {
    const listItems = array.map(item => {
    return item == 1 ? `<li class="li"><div class="black-square"></div></li>`: `<li class="li"><div class="white-square"><div/></li>`;
    })
    return `<ol class="ol">${listItems.join('')}</ol>`;
   }

    bodyId.innerHTML = getSquareOrderedList(getArrayRandomIntNumbers(10, 0, 2))

function getMatrixRandomIntNumbers (rows, colums, min, max) {
    let arr = [];
    arr.length = rows;
    return [...arr].map(() => getArrayRandomIntNumbers(colums, min, max));
}

console.log(getMatrixRandomIntNumbers(20,20,0,4))