

let date = new Date();
let dateMonth = date.getMonth();

let dateDay = date.getDate();
let dateYear = date.getFullYear();
let dateTostring = `${dateDay}-${dateMonth + 1}-${dateYear}`;
if (dateMonth < 10) {
  dateTostring = `${dateDay}-0${dateMonth + 1}-${dateYear}`;
}
if (dateDay < 10) {
  dateTostring = `0${dateDay}-${dateMonth + 1}-${dateYear}`;
}

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthsOfYear = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const dayOfWeekIndex = date.getDay();
const dayName = daysOfWeek[dayOfWeekIndex];

const monthName = monthsOfYear[dateMonth];

var hours = date.getHours();
var minutes = date.getMinutes();
var seconds = date.getSeconds();
var ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12 || 12;

// Format the time to add leading zeros if needed
var formattedTime = ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2) + ' ' + ampm;

// today 20/5/2023 07:41:52 AM
// dateTostring = 20-06-2023
// dateDay = 20
// dayName = Tuesday
// dateMonth = 5
// monthName = June
// dateYear = 2023
// hours = 7
// minutes 41
// seconds
// formattedTime 07:41:52 AM


function getPostsAdhan() {
  var longitude;
  let latitude = null;

  // Check if latitude and longitude are already stored in browser storage
  const storedLatitude = localStorage.getItem('latitude');
  const storedLongitude = localStorage.getItem('longitude');

  if (storedLatitude && storedLongitude) {
    // Use stored latitude and longitude values
    latitude = storedLatitude;
    longitude = storedLongitude;
    // console.log(`latitude: ${latitude} \nlongitude: ${longitude}`);
    fetch(`https://api.aladhan.com/v1/calendar/${new Date().getFullYear()}?latitude=${latitude}&longitude=${longitude}`)
      .then(response => response.json())
      .then(prayer => {
        let dateData = prayer.data[date.getMonth() + 1][date.getDay() + 1];
                //  console.log(dateData)
                DateContent=`${dayName}, ${dateDay} ${monthName} ${dateYear}`;
                dateDiv=document.querySelector(".time2 p");
                dateDiv.innerHTML=DateContent;

                timeContent=`${hours}:${minutes}`;
                timeDiv=document.querySelector(".time2 h1");
                timeDiv.innerHTML=timeContent;
                let content = `
                            <li>${dateData.timings.Imsak.split(' ')[0]}</li>
                            <li>${dateData.timings.Fajr.split(' ')[0]}</li>
                            <li>${dateData.timings.Sunrise.split(' ')[0]}</li>
                            <li>${dateData.timings.Dhuhr.split(' ')[0]}</li>
                            <li>${dateData.timings.Asr.split(' ')[0]}</li>
                            <li>${dateData.timings.Sunset.split(' ')[0]}</li>
                            <li>${dateData.timings.Maghrib.split(' ')[0]}</li>
                            <li>${dateData.timings.Isha.split(' ')[0]}</li>
                            <li>${dateData.timings.Firstthird.split(' ')[0]}</li>
                            <li>${dateData.timings.Midnight.split(' ')[0]}</li>
                            <li>${dateData.timings.Lastthird.split(' ')[0]}</li>`;

                document.querySelector(".times").innerHTML = content;
      })
  } else if (navigator.geolocation) {
    // Request location permission
    navigator.geolocation.getCurrentPosition(
      (location) => {
        latitude = location.coords.latitude;
        longitude = location.coords.longitude;

        // Store latitude and longitude in browser storage
        localStorage.setItem('latitude', latitude);
        localStorage.setItem('longitude', longitude);

        // console.log(`latitude: ${latitude} \nlongitude: ${longitude}`);
        fetch(`https://api.aladhan.com/v1/calendar/${new Date().getFullYear()}?latitude=${latitude}&longitude=${longitude}`)
        .then(response => {
          if (response.ok) {
            return response.json()
          }
        }).then((prayer) => {

          let dateData = prayer.data[date.getMonth() + 1][date.getDay() + 1];
          //  console.log(dateData)
          DateContent = `${dayName}, ${dateDay} ${monthName} ${dateYear}`;
          dateDiv = document.querySelector(".time2 p");
          dateDiv.innerHTML = DateContent;

          timeContent = `${hours}:${minutes}`;
          timeDiv = document.querySelector(".time2 h1");
          timeDiv.innerHTML = timeContent;
          let content = `
                            <li>${dateData.timings.Imsak.split(' ')[0]}</li>
                            <li>${dateData.timings.Fajr.split(' ')[0]}</li>
                            <li>${dateData.timings.Sunrise.split(' ')[0]}</li>
                            <li>${dateData.timings.Dhuhr.split(' ')[0]}</li>
                            <li>${dateData.timings.Asr.split(' ')[0]}</li>
                            <li>${dateData.timings.Sunset.split(' ')[0]}</li>
                            <li>${dateData.timings.Maghrib.split(' ')[0]}</li>
                            <li>${dateData.timings.Isha.split(' ')[0]}</li>
                            <li>${dateData.timings.Firstthird.split(' ')[0]}</li>
                            <li>${dateData.timings.Midnight.split(' ')[0]}</li>
                            <li>${dateData.timings.Lastthird.split(' ')[0]}</li>`;

          document.querySelector(".times").innerHTML = content;

        })
    },
    );
  }
}

getPostsAdhan();



