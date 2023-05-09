// console.log("hello world");
//ubiraet drobnuu chast
//Math.trunc, round, 
// let a = "256 * 320";
// console.log(+a);
// console.log(parseInt(a));
// a = "257.4a";
// console.log(+a, parseInt(a), parseFloat(a));
// console.log(String.fromCharCode(65));
// console.log('A'.charCodeAt(0));
// console.log(String.fromCodePoint(65,66,67));
// console.log(String.name);
// console.log(Number.name);
// console.log((123).toString);
// console.log((123).toString(16));

// function myToStringInt(number, radix) {
//     if (radix < 2 || radix > 36) {
//         radix = 10; 
//       }
//     const intValue = Math.floor(number); 
//     const strValue = intValue.toString(radix); 
//     return strValue;
//   }


//   const number = 568.55;
//   const radix = 37;
//   const result = myToStringInt(number, radix);
//   console.log(result); 

function myToStringInt(number, radix) {
    if (radix < 2 || radix > 36) {
        radix = 10;
    }
    let numberFloored = Math.floor(number);
    numberFloored = Math.abs(number);


    let result = '';

    do {
        const remainder = numberFloored % radix;
        let char;
        if (remainder < 10) {
            char = String(remainder);
        } else {
            char = String.fromCharCode(remainder + 87);
        }
        result = char + result;
        numberFloored = Math.floor(numberFloored / radix);
    }
    while (numberFloored > 0);
    
    if (number < 0) {
        return "-" + result;
    }

    return result;
}


const number = -14556;
const radix = 16;
const result = myToStringInt(number, radix);
console.log(result);
