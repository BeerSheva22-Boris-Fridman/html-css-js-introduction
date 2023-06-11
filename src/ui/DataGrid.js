export default class DataGrid {
    #tBodyElement
    #keys
    #data
    constructor(parentId, columns) {
        //colums -array of objects {field : <name of key>, 
        //header name: <column name>}
      this.#keys = columns.map(column => column.field);
      this.#buildTableHeader(parentId, columns.map(column => column.headerName))
    }

    fillData(rowsData) {
        const tableRows = rowsData.map((rowData) => {
            const cells = this.#keys.map(fieldName => {
                // Проверяем, если поле fieldName равно 'poster_path', то вместо обычного текста вставляем тег img
                if (fieldName === 'poster_path') {
                    const imageUrl = "https://image.tmdb.org/t/p/w500/" + rowData[fieldName];
                    return `<td><img src="${imageUrl}" alt="Movie Poster" style="width: 100px;"></td>`;
                } else {
                    return `<td>${rowData[fieldName]}</td>`;
                }
            }).join('');

            const row = document.createElement('tr');
            row.innerHTML = cells;
            row.setAttribute('data-movie-data', JSON.stringify(rowData));
            return row;
        });

        this.#tBodyElement.innerHTML = '';
        tableRows.forEach(row => {
            this.#tBodyElement.appendChild(row);
        });
    }
    
    addClickListener(callback) {
        this.#tBodyElement.addEventListener('click', (event) => {
          const clickedRowIndex = event.target.closest('tr').rowIndex - 1;
          const clickedMovie = this.#data[clickedRowIndex];
          callback(clickedMovie);
        });
      }
      
    
    #buildTableHeader(parentId, columnNames) {
        const tableSectionElement = document.getElementById(parentId);
        tableSectionElement.innerHTML = 
        `<table>
            <thead>
                <tr class = "hedderRow">
                    ${columnNames.map(headerName => `<th>${headerName}</th>`).join('')}
                </tr>
            </thead>
            <tbody id="${parentId}-table">
            </tbody>
        </table>`;
        this.#tBodyElement = document.getElementById(parentId + "-table");       
    }
}