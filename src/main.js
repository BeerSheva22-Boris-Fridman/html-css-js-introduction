import openMeteoConfig from "./config/service-config.json" assert {type: 'json'};
import OpenMeteoService from "./service/openMeteoService.js";
import DataGrid from "./ui/DataGrid.js";
//constants defenitio
const columns = [
    {field: 'date', headerName: 'Date'},
    {field: 'time', headerName: 'Time'},
    {field: 'temperature', headerName: 'Temperature'},
    {field: 'apparentTemperature', headerName: 'Fealt temp'}
]


//functions
function getISODateSTR (date) {
    return date.toISOString().substring(0,10)
}
function getEndDate(startDateStr, days) {
    const date = new Date(startDateStr);
    const endDate = new Date(date.setDate(date.getDate() + days));
    return getISODateSTR(endDate)
}

const fromFormData = {
city: 'Rehovot',
startDate: getISODateSTR(new Date()),
days: 5, 
hourFrom: 12, 
hourTo: 14
};

//objects
const openMeteoService = new OpenMeteoService(openMeteoConfig.baseUrl);
const table = new DataGrid("table-place", columns)
const latLong = openMeteoConfig.cities[fromFormData.city];
const {lat, long} = latLong; //destructuring of the object
const {startDate, days, hourFrom, hourTo} = fromFormData;
openMeteoService.getTemperatures(lat, long, startDate, getEndDate(startDate, days), 
hourFrom, hourTo).then(data => table.fillData(data));

