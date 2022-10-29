let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const apiKey = '8ad314cbd54d15d37a72d71f347c1aff';
const serverUrl = 'http://localhost:3000/';
const zipCodeEle = document.getElementById('zip');
const feelingEle = document.getElementById('feelings');
const tempEle = document.getElementById('temp');
const dateEle = document.getElementById('date');
const userResponseEle = document.getElementById('content');

document.getElementById('generate').addEventListener('click', generation);

async function generation () {
    let data = {
        zip: zipCodeEle.value.trim(),
        feeling: feelingEle.value.trim(),
        date: newDate
    }
    // fetch(`https:api.openweathermap.org/data/2.5/weather?zip=${data.zip},&appid=${apiKey}&units=metric`)
    // .then((data)=> data.json())
    // .then((data)=> console.log(data))
    try {
        const response = await fetch(`https:api.openweathermap.org/data/2.5/weather?zip=${data.zip},&appid=${apiKey}&units=metric`);
        const allData = await response.json();
        data.temp = Math.round(allData.main.temp) + ' C';
        postDataToServer(data);
    } catch (err) {
        console.log('Error: ', err.error);
    }
}

async function postDataToServer (data) {
    const res = await fetch(`${serverUrl}add`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
    });

    try {
        // console.log(await res.json());
        updateUI();
    } catch (err) {
        console.log('Error: ', err.error);
    }
}

async function updateUI () {
    const response = await fetch(`${serverUrl}all`);
    const allData = await response.json();
    
    try {
        tempEle.innerHTML = `Temperature: ${allData.temp}`;
        dateEle.innerHTML = `Date now: ${allData.date}`;
        userResponseEle.innerHTML = `Your feeling: ${allData.feeling}`;
    } catch (err) {
        console.log('Error: ', err.error);
    }
}

