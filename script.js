// Importing  data
const deg = 6;
const hr = document.querySelector('#hr');
const mn = document.querySelector('#mn');
const sc = document.querySelector('#sc');

const currentTime = document.querySelector('h1');
const audio = new Audio('files/ringtone.mp3');
const NextAlarmList = document.querySelector('#Next-alarms-list');
const addAlarm = document.querySelector('.setAlarm');


// Initializing the units and setting the interval
setInterval(() =>{
    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * deg;
    let ss = day.getSeconds() * deg;

// for making rotation of units hand.

    hr.style.transform = `rotateZ(${(hh)+(mm/12)}deg)`;
    mn.style.transform = `rotateZ(${mm}deg)`;
    sc.style.transform = `rotateZ(${ss}deg)`;

});
// If the number is less than 10 append 0 before it.
function formatTime(time) {
    if (time < 10 && time.length != 2) {
        return '0' + time;
    }
    return time;
}
// Shows the real time
function updateTime() {
    var today = new Date();
    const hour = formatTime(today.getHours());
    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());
    const realTime = `${hour}:${minutes}:${seconds}`;

    currentTime.innerText = `${hour}:${minutes}:${seconds}`;

}
// calls updateTime() every second
setInterval(updateTime, 1000);

// Adds newAlarm to the upcoming-alarms-list as a new list item 
function addNewAlarm(newAlarm) {
    const html = 
    `<li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm" onclick = "remove(this.value)" value=${newAlarm}>X</button>       
    </li>`
    NextAlarmList.innerHTML += html
};
const alarmList = []; // To store all alarms Which has been set

// event to set a new alarm whenever the form is submitted 
addAlarm.addEventListener('submit', event => {

    event.preventDefault(); // to prevent default behaviour of webpage and reloadness.

    let hour = formatTime(addAlarm.hr.value);
    if (hour === '0') {
        hour = '00'
    }
    let minute = formatTime(addAlarm.min.value);
    if (minute === '0') {
        minute = '00'
    }
    let second = formatTime(addAlarm.sec.value);
    if (second === '0') {
        second = '00'
    }

    const newAlarm = `${hour}:${minute}:${second}`

    // add newAlarm to alarmList array
    if (isNaN(newAlarm)) {
        if (!alarmList.includes(newAlarm)) {
            alarmList.push(newAlarm);
            addNewAlarm(newAlarm);
            addAlarm.reset();
        } else {
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else {
        alert("Invalid Time Entered")
    }
})



