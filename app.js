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
    
    const array = [1, 2, 3];
    console.log(getOrderedList(array));
    // using the map method, I convert each element of the array into a string <li>, 
    //then using the join method, I join the strings without a separator. 
    //then in the return I use a template literal to wrap the result in an <ol> tag