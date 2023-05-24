 function getEndDate(startDate,days) {
    const start = new Date(startDate);
    const endDate = new Date(start.setDate(start.getDate() + days));
   
    return endDate.toISOString().substring(0,10);
}
console.log(getEndDate('2023-05-23', 2));

const test = 'right partKleft part';
const split = test.split('K');
const r = split[0];
const l = split[1];
console.log(r);
console.log(l);

function boryaFridman (name, surname) {
    console.log(name+ ' ' + surname);
}
const name1 = 'Borya'
const surname = 'Fridman'
boryaFridman(name1, surname)

setTimeout(boryaFridman, 2000, "borja", ' frid');
setTimeout(boryaFridman, 2000);

function sum (sum1, b) {
    console.log(b);
    setTimeout (() => {
        const res = sum1(5,6)
        console.log(res);
    }, 2000)
}

sum((a,b) => a + b, 10)