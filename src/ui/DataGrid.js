export default class DataGrid {
    #tBodyElement
    #keys
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

            return `<tr>${cells}</tr>`;
        });
        this.#tBodyElement.innerHTML = tableRows.join('');
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