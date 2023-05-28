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
            const cells = this.#keys.map(fieldName => `<td>${rowData[fieldName]}</td>`).join('');
         //   const rowClass = index %  2 == 0 ? 'evenRow' : 'oddRow';
            const rowClass = rowData.date.slice(-1)%2 == 0 ? 'evenRow' : 'oddRow';
            return `<tr class ="${rowClass}">${cells}</tr>`;
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