import openMeteoConfig from "./config/service-config.json" assert {type: 'json'};
import OpenMeteoService from "./service/openMeteoService.js";
import DataGrid from "./ui/DataGrid.js";
import WeatherForm from "./ui/WeatherForm.js";
import {getISODateSTR, getEndDate} from "./util/date-functions.js"

//constants defenitio
const columns = [
    {field: 'date', headerName: 'Date'},
    {field: 'time', headerName: 'Time'},
    {field: 'temperature', headerName: 'Temperature'},
    {field: 'apparentTemperature', headerName: 'Fealt temp'}
];

// const fromFormData = {
// city: 'Rehovot',
// startDate: getISODateSTR(new Date()),
// days: 5, 
// hourFrom: 12, 
// hourTo: 14
// };

// //objects
// const form = new WeatherForm("form-place", Object.keys(openMeteoConfig.cities), openMeteoConfig.maxDays);
const openMeteoService = new OpenMeteoService(openMeteoConfig.baseUrl);
const table = new DataGrid("table-place", columns);
// const latLong = openMeteoConfig.cities[fromFormData.city];
// const {lat, long} = latLong; //destructuring of the object
// const {startDate, days, hourFrom, hourTo} = fromFormData;
// //const startDate = WeatherForm.#dateElement
// openMeteoService.getTemperatures(lat, long, startDate, getEndDate(startDate, days), 
// hourFrom, hourTo).then(data => table.fillData(data));

//---------------------------------------------------------------------------------------------------
const form = new WeatherForm("form-place", Object.keys(openMeteoConfig.cities), openMeteoConfig.maxDays);
// Создаю функцию, которая будет возвращать промис после отправки формы
function submitForm() {

    return new Promise((resolve) => {
      // Внутри промиса создаю экземпляр WeatherForm
      
  
      // Получаю данные из формы после отработки события нажатия кнопки 
      form.onSubmit((formData) => {
        resolve(formData); // передаю в ресолв данные из формы
      });
    });
  }
  
  // Вызоваю функцию submitForm и вытаскиваю нужные значения из форм дата, чтобы передать их в гетТемперачерс
  async function run () {
     while (true) {
    const formData = await submitForm()
    // Используйте formData для вызова openMeteoService.getTemperatures
    const latLong = openMeteoConfig.cities[formData.city];
    const { lat, long } = latLong;
    const { startDate, days, hourFrom, hourTo } = formData;
  
    const data = await openMeteoService
      .getTemperatures(lat, long, startDate, getEndDate(startDate, days), hourFrom, hourTo)
      table.fillData(data);
  };
  }

  run();
 
  
  

