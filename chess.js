

// function getSquareOrderedList(array) {
//     const listItems = array.map(item => {
//     return item == 1 ? 
// <div class="div-board">
//     <div class="white-square"></div>
//     <div class="black-square"></div>
//     <div class="white-square"></div>
//     <div class="black-square"></div>
//     <div class="white-square"></div>
//     <div class="black-square"></div>
//     <div class="white-square"></div>
//     <div class="black-square"></div>
// </div>: 
// <div class="div-board">
//     <div class="black-square"></div>
//     <div class="white-square"></div>
//     <div class="black-square"></div>
//     <div class="white-square"></div>
//     <div class="black-square"></div>
//     <div class="white-square"></div>
//     <div class="black-square"></div>
//     <div class="white-square"></div>
// </div> ;
//     })
//      return listItems;
//    }




//**********************************************************
//Solution with optimasation jast for lines but not for cells:
//**********************************************************

// const repiteNumber = 8;
// oneZeroArray = [];
// for (let i = 0; i<repiteNumber ; i ++) {
//     oneZeroArray.push(i % 2 === 0 ? 0 : 1);
// }

// function getChess(oneZeroArray) {
//     const listItems = oneZeroArray.map(item => {
//    return item === 0 ? 
//     `<div class="div-board">
//          <div class="white-square"></div>
//          <div class="black-square"></div>
//          <div class="white-square"></div>
//          <div class="black-square"></div>
//          <div class="white-square"></div>
//          <div class="black-square"></div>
//          <div class="white-square"></div>
//          <div class="black-square"></div>
//     </div>`: 
//     `<div class="div-board">
//         <div class="black-square"></div>
//         <div class="white-square"></div>
//         <div class="black-square"></div>
//         <div class="white-square"></div>
//         <div class="black-square"></div>
//         <div class="white-square"></div>
//         <div class="black-square"></div>
//         <div class="white-square"></div>
//     </div>`;
//     })
//       return listItems.join('');
//    }

//    const bodyId = document.getElementById('bodyId');
//    bodyId.innerHTML = getChess(oneZeroArray);


//**********************************************************
//Solution with optimasation  lines and cells:
//**********************************************************

const repiteNumber = 8;
chessBoard = [];

for (let i = 0; i < repiteNumber; i++) {
    const row = [];
    for (let j = 0; j < repiteNumber; j++) {
       const isEven = (i + j) % 2 === 0;
         row.push(isEven ? 'white' : 'black');
    }
    chessBoard.push(row);
}


function getChess(chessBoard) {
    const listItems = chessBoard.map(rows => {
        const cells = rows.map(cell => {
            return `<div class="${cell}-square"></div>`;
        });
        return `<div class="div-board">${cells.join('')}</div>`;
    });
    return listItems.join('');
}

// const bodyId = document.getElementById('bodyId');
// bodyId.innerHTML = getChess(chessBoard);

