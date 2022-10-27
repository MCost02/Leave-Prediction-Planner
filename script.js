let nav = 0;
let clicked = null;

const calendar = document.getElementById('calendar');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function load() {
    var date = new Date();

    for (let x = 0; x <25; x++) {
        
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        //this displays the month and year for each month
        const monthYearDisplay = document.createElement('div');
        monthYearDisplay.setAttribute('id', 'header');
        monthYearDisplay.innerText = date.toLocaleDateString('en-us', {month:'long'}) + ", " +year;
        calendar.appendChild(monthYearDisplay);

        //displays the days of the week for each month
        const days = document.createElement('div');
        days.setAttribute('id', 'weekdays');
        days.innerHTML = 
        '<div>Sunday</div>'
        + '<div>Monday</div>'
        + '<div>Tuesday</div>'
        + '<div>Wednesday</div>'
        + '<div>Thursday</div>'
        + '<div>Friday</div>'
        + '<div>Saturday</div>';
        calendar.appendChild(days);

        //calculates total days in month, what weekday the month starts on, and the amount of empty days
        const daysInMonth = new Date(year, month + 1 , 0).getDate();
        const firstDayOfMonth = new Date(year, month , 1);

        const firstDay = firstDayOfMonth.toLocaleDateString('en-us', {weekday: 'long',});
        
        const emptyDays = weekdays.indexOf(firstDay);
        
        //creates the calander for a spesific month
        for(let i = 1; i <= emptyDays + daysInMonth; i++) {
            const daySquare = document.createElement('div');
            daySquare.classList.add('day');
    
            if(i > emptyDays) {
                daySquare.innerText = i - emptyDays;
            } else {
                daySquare.classList.add('padding');
            }
            
            calendar.appendChild(daySquare);
        }

        const block = document.createElement('div');
        block.classList.add('space');
        calendar.appendChild(block);
        date = new Date(date.setMonth(date.getMonth() + 1));
    }
    
}

load();