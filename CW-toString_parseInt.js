function myToStringInt(number, radix) {
    //number - any number
    //radix - computation base if radix < 2 or radix > 36 then radix = 10
    //removes fractional part, 34.25 => 34 ; 34.75 => 35 
    //toString method is diallowed
    //return string as a view presentation of the integer part of a given number in accordance with the given radix
    //
    const sign = number < 0 ? '-' : '';
    number = Math.abs(number); //negative to positive
    number = Math.round(number); //rounding to close integer number
    if (radix < 2 || radix > 36) {
        radix = 10;
    }
    let res = '';
    do {
        res = getSymbol(number, radix) + res;
        number = Math.trunc(number / radix);
    } while (number != 0);
    return sign + res;
}
function getSymbol(number, radix) {
    const aCode = 'a'.charCodeAt(0);
    const delta = aCode - 10;
    const remainder = number % radix;
    return remainder < 10 ? remainder + '' : String.fromCharCode(remainder + delta);
}
// console.log((123456789).toString(36));
// console.log(myToStringInt(123456789, 36));
// console.log(myToStringInt(-123456789, 36));
// console.log(myToStringInt(-123456789.5234, 36));
// console.log(myToStringInt(0, 36));
// "string" or 'string' with no string interpolation 'a' - string
//`...${<expression>}...`
const strNum = '-100';
let radix=16;
console.log(`string with number ${strNum} for redix ${radix} is ${parseInt(strNum, radix)}`)
function myParseInt(strNum, radix) {
    //the same behavior as standard parseInt
    strNum = strNum.trim();
    let index = strNum.charAt(0) == '-' || strNum.charAt(0) == '+' ? 1 : 0;
    
    if ((!radix || radix == 16) && getHexdecemalIndex(strNum.substring(index) )> 0) {
        index += 2;
        radix = 16
    }
    if (!radix) {
        radix = 10;
    }
    let res = radix > 1 && radix < 37 ? getDigitCode(strNum, index, radix) : NaN;

    if (!isNaN(res)) {
        let digit;
        index++;
        while (index < strNum.length &&
            !isNaN(digit = getDigitCode(strNum, index, radix))) {
            res = res * radix + digit;
            index++;
        }
        if(strNum[0] == '-') {
            res = -res
        }

    }
    return res;
}
function getHexdecemalIndex(str) {
   
    return str.toLowerCase().startsWith('0x') ? 2 : 0;
}
function getDigitCode(strNum, index, redix) {
    const delta = 'a'.charCodeAt(0) - 10;
    const symbol = strNum.charAt(index).toLowerCase();
    const code = symbol >= '0' && symbol <= '9' ? +symbol : symbol.charCodeAt(0) - delta;
    return code >= 0 && code < redix ? code : NaN;
}

console.log(`string with number ${strNum} for redix ${radix} is ${myParseInt(strNum, radix)}`)

//console.log(eval("let d = function() {return function {return 10}}; Math.sqrt(4) * (100 - d()())"));
// console.log(`3 == "3" is ${3 == "3"}`)
// console.log(`3 === "3" is ${3 === "3"}`)