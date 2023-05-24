// async function getTemperatures (lat, long) {
//     const response = 
//     await fetch(`https://api.open-meteo.com/v1/gfs?latitude=${lat}&longitude=${long}&hourly=temperature_2m`);
//     return response.json();

// }

// getTemperatures(31.89, 34.81).then((response) => console.log(response)).catch(error => console.log(kuku));

//написать функциональность, которая принимает широту и долготу, принимает начальную дату, количество дней(не более 16) и часы с такого-то по такое-то
//возвращает массив объектов в формате:



//startDate - ISO date of forecast
//returns:
//array of objects {date: <string containing date YYYY-MM-YY with no time>, 
//time: <hour number in selected range>
//teperature: <number>
//apperent temp: <number>}
//
// async function getTemperatures(lat, long, startDate, days, hourFrom, hourTo) {
//     let arr = []
//     const endDate = await getEndDate (startDate,days);
//     const response =
//         await fetch(`https://api.open-meteo.com/v1/gfs?latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature&forecast_days=${days}&start_date=${startDate}&end_date=${endDate}&timezone=IST`);
//         const data = await response.json();
       
    
      
//      for (let i = 0; i < days; i++) {
//             const hourlyData = data[i].hourly;
//         for (let j = hourFrom; j < hourTo; j++) {
//             const time = j % 24; // Convert to 0-23 hour format
//             const temperature = hourlyData[time].temperature_2m;
//             const apparentTemperature = hourlyData[time].apparent_temperature;
//             arr.push({
//                 date: endDate,
//                 time: time,
//                 temperature: temperature,
//                 apparentTemperature: apparentTemperature
//             });
//         }
//     }
//     return arr;
// }

// async function getEndDate(startDate,days) {
//     const start = new Date(startDate);
//     const endDate = new Date(start.setDate(start.getDate() + days));
   
//     return endDate.toISOString().substring(0,10);
// }


// getTemperatures(31.89, 34.81, "2023-05-23", 2, 9, 17)
//     .then((arr) => console.log(arr))
//     .catch((error) => console.log(error));

    // Решение Юрия:

    async function getTemperatures(lat, long, startDate, days, hourFrom, hourTo) {
        //Parameters: lat - latitude, long - longitude, startDate - ISO date of forecast,
        // days - forecast days, hourFrom, hourTo - closed range of the hours for each day
        //returns:
        //array of objects {date: <string containing date YYYY-MM-YY with no time>,
        // time: <hour number from the given range>, temperature: <number>,
        // apperantTemperature: <number> }
        const endDate = getEndDate(startDate, days);
        const url = getUrl(lat, long, startDate, endDate);
        const response = await fetch(url);
        const data = await response.json();
        const dates = getDataForHours(data.hourly.time, hourFrom, hourTo);
        const temperatures = getDataForHours(data.hourly.temperature_2m, hourFrom, hourTo);
        const apparentTemperatures = getDataForHours(data.hourly.apparent_temperature, hourFrom, hourTo);
        return dates.map((d, index) => {
            const tokens = d.split("T");
            const date = tokens[0];
            const time = tokens[1];
            return {date, time, temperature: temperatures[index],
                 apparentTemperature: apparentTemperatures[index]};
        })
    
    }
    function getEndDate(startDateStr, days) {
        const startDate = new Date(startDateStr);
        const endDate = new Date(startDate.setDate(startDate.getDate() + days));
        return endDate.toISOString().substring(0, 10);
    }
    function getUrl(lat, long, startDate, endDate) {
        return `https://api.open-meteo.com/v1/gfs?latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature&timezone=IST&start_date=${startDate}&end_date=${endDate}`
    }
    function getDataForHours(array, hourFrom, hourTo) {
        return array.filter((__, index) => {
            const rem = index % 24;
            return rem >= hourFrom && rem <= hourTo
        })
    }
    getTemperatures(31.89, 34.81, '2023-05-23', 5, 9, 17)
    .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });


