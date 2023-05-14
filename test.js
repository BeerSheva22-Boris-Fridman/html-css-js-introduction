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
        //создаем переменную в которую сохраним элемент который будем переносить, соответственно это элемент по индексу index
        
        const elementToMove = array.splice(index,1)[0];
        return newIndex < 0 ? [elementToMove, ...array] : [...array, elementToMove];
        
    //     const elementToMove = array[index];
    //     const arrayCopy = [...array.slice(0, index), ...array.slice(index + 1, array.length)];
    //    return newIndex < 0 ? [elementToMove, ...arrayCopy] : [...arrayCopy, elementToMove];
    
    
      }
    
    //   const arrayCopy = [...array];
      const element = array.splice(index, 1) [0];
      array.splice(newIndex, 0, element);
    
      return array;
    }
        
        //example: ar =  [1, 2, 3, 4, 5] ; moveElement(ar,2, 1) =>   [1,2,4,3,5];   
        //example: ar =  [1, 2, 3, 4, 5] ; moveElement(ar,2, -2) =>  [3,1,2,4,5];   
        //example: ar =  [1, 2, 3, 4, 5] ; moveElement(ar,2, -20) => [3,1,2,4,5];   
        //example: ar =  [1, 2, 3, 4, 5] ; moveElement(ar,2, 20) =>  [1,2,4,5,3];   
    
        const ar = [1, 2, 3, 4, 5];
    
   
        console.log(moveElement(ar, 2, 1));     // [1, 2, 4, 3, 5]
        console.log(moveElement(ar, 2, -2));    // [3, 1, 2, 4, 5]
        console.log(moveElement(ar, 2, -20));   // [3, 1, 2, 4, 5]
        console.log(moveElement(ar, 2, 20));    // [1, 2, 4, 5, 3]
        console.log(moveElement(ar, 20, 1));    // [1, 2, 3, 4, 5]
        console.log(moveElement(ar, -20, 1));   // [1, 2, 3, 4, 5]