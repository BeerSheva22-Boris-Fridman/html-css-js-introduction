
//****************** методы Splise и Splise ************************

// const array1 = [1,2,3,4,5,6]
// ***** Splise *****
// либо удаляем, если передаем два аргумента, первый - это индекс с которого, второй сколько элементов начиная с индекса удалим
// либо добавляем, тогда передаем 3 параметра, первые два такие же, третий - это что мы поставим на новое место вместо удаленного

// array.splice(0,3)
// array.splice(0,3,4)
// console.log(array)

// ***** Slise *****
// данный метод создает копию массива, то есть никак не меняет исходный массив. в параметрах указываем два числа: 
// первое - индекс откуда начинаем копировать, второе -  сколько элементов начиная с указанного индекса
// чтобы увидеть результат работы метода, необходимо записать его в отдельную переменную

// let arrayCopy = array1.slice(0,2)
// console.log(arrayCopy)

// ***** HW *****

function arraycopy(src, posSrc, dst, posDst=0, length) {
   chekedPosDst = posDst < 0 ? src.length + posDst : posDst;
   const copiedElements = src.slice(posSrc, posSrc + length);
   dst.splice(checkedPosDst, length, ...copiedElements);

    //TODO copy "length" elements from position "posSrc" of array "src" to array "dst" from position "posDst"
}


function moveElement(array, position, shift) {
// вычисляем индекс элемента, который нужно переместить, если position отрицательная, то это значит, 
// что мы ведем отсчет с конца массива, а не с начала
const index = position < 0 ? array.length + position : position;
// если в результате индекс будет выходить за пределы массива, то мы вернем исходный массив
  if (index < 0 || index >= array.length) {
    return array;
  }
// вычисляем новый индекс элемента на который он должен переехать
  const newIndex = index + shift;
//делаем проверку, что индекс на который будем переносить элемент находится в пределах длинны исходного массива 
  if (newIndex < 0 || newIndex >= array.length) {
    //создаем переменную в которую сохраним элемент который будем переносить, соответственно это элемент в array по индексу index
    const elementToMove = array[index];
    //создаем копию массива с помощью метода slice в который сначала записываем часть элементов массива от нулевого индекса 
    //на количество элементов равное значению индекса index и ыторая часть от индекса (index + 1) на количество элементов равное 
    //array.length
    const arrayCopy = [...array.slice(0, index), ...array.slice(index + 1, array.length)];
    //возвращаем перемещаемое число на первом илипоследнем месте массива 
    //в зависимости от того положительное или отрицательное значение имеет newIndex
   return newIndex < 0 ? [elementToMove, ...arrayCopy] : [...arrayCopy, elementToMove];


  }

  const arrayCopy = [...array];
  const element = arrayCopy.splice(index, 1)[0];
  arrayCopy.splice(newIndex, 0, element);

  return arrayCopy;
}
    
    //example: ar =  [1, 2, 3, 4, 5] ; moveElement(ar,2, 1) =>   [1,2,4,3,5];   
    //example: ar =  [1, 2, 3, 4, 5] ; moveElement(ar,2, -2) =>  [3,1,2,4,5];   
    //example: ar =  [1, 2, 3, 4, 5] ; moveElement(ar,2, -20) => [3,1,2,4,5];   
    //example: ar =  [1, 2, 3, 4, 5] ; moveElement(ar,2, 20) =>  [1,2,4,5,3];   

    const ar = [1, 2, 3, 4, 5];

    // const arCopy = [...ar];
    // console.log(arCopy); 
    // let index = 2;
    // let delitedNumber = ar.splice(index,1)[0]
    // console.log(delitedNumber);     // [1, 2, 4, 3, 5]


    console.log(moveElement(ar, 2, 1));     // [1, 2, 4, 3, 5]
    console.log(moveElement(ar, 2, -2));    // [3, 1, 2, 4, 5]
    console.log(moveElement(ar, 2, -20));   // [3, 1, 2, 4, 5]
    console.log(moveElement(ar, 2, 20));    // [1, 2, 4, 5, 3]
    console.log(moveElement(ar, 20, 1));    // [1, 2, 3, 4, 5]
    console.log(moveElement(ar, -20, 1));   // [1, 2, 3, 4, 5]
    console.log(moveElement(ar, -2, 1));   // [1, 2, 3, 5, 4]
    //src, posSrc, dst, posDst=0, length
//    console.log(arraycopy(ar, 1, 2, ));   // [1, 2, 3, 5, 4]


    // ******** CW 14/05 *************

    //задание - написать используя редьюс 
    