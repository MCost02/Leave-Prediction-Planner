const jsdom = require('jsdom');
const { JSDOM } = jsdom;


class Child {
    constructor(name, schoolDistrict) {
        this.name = name;
        this.schoolDistrict = schoolDistrict;
    }
}

class Instructor {
    constructor(name) {
        this.name = name;
        this.importantDates = [];
    }
    add(newDate) {
        this.importantDates.push(newDate);
    }
}

class Calendar {
    constructor() {
        this.totalMonths = 12;
        this.currentDay = new Date();
	    this.month = currentDay.getMonth();
	    this.year = currentDay.getYear();

        this.calendar = new Array(totalMonths);
        this.heatMap = new Array(totalMonths);
        this.tempMap = new Array(totalMonths);

        let daysInMonth = new Date(year, month+1, 0).getDate();
		let firstDayofMonth = new Date(year, month, 1).getDate();
		 
		for (let m = 0; m < totalMonths; m++) {
			daysInMonth = new Date(year, month+1+m, 0).getDate();
			
			calendar.push(new Array(m));
			heatMap.push(new Array(m));
			tempMap.push(new Array(m));

			for (let d = 1; d <= daysInMonth; d++) {
				heatMap[m].push(0);
				tempMap[m].push(0);
				calendar[m].push(new Date(year, month+m, d));
			}
		}
    }
    updateCalendar() {
        for (let i = 0; i < instructors.size(); i++) {

			for (let x = 0; x < instructors[i].numDates(); x++) {
				
				//this is to figure out which months are which relative to the current month
				let tempMonth = instructors[i].importantDates[x].getMonth();
				let tempDay = instructors[i].importantDates[x].getDate()-1;
				let monthNav = 0;
				if (tempMonth - month < 0) {
					monthNav = 12 + (tempMonth - month);
				} else {
					monthNav = tempMonth - month;
				}
				
				let potentialDays = 0;
				
				if (calendar[monthNav][tempDay].getDay() <= 1) {
					potentialDays = 3;
					for (let m = 0; m < potentialDays; m++) {
						if (tempMap[(monthNav)][tempDay-1+m] == 0) {
							tempMap[monthNav][tempDay-1+m] = 1;
						}
					}    
					
				} else if (calendar[monthNav][tempDay].getDay() >= 2 &&  calendar[monthNav][tempDay].getDay <= 4) { 
					if (tempMap[monthNav][tempDay] == 0) {
						tempMap[monthNav][tempDay] = 1;
					}
				} else if (calendar[monthNav][tempDay].getDay == 5) {
					potentialDays = 3;
					for (let m = 0; m < potentialDays; m++) {
						if (tempMap[monthNav][tempDay+m] == 0) {
							tempMap[monthNav][tempDay+m] = 1;
							System.out.println(tempDay+m);
						}
					}
				} else {
					potentialDays = 2;
					for (let m = 0; m < potentialDays; m++) {
						if (tempMap[monthNav][tempDay+m] == 0) {
							tempMap[monthNav][tempDay+m] = 1;
						}
					}
				}
				

			}
			//think of a better way to add to heat map and zero all numbers
			//maybe use addedDates list and division 
			for (let j = 0; j < totalMonths; j++) {
				for (let k = 0; k < heatMap[j].size(); k++) {
					this.heatMap[j][k] =heatMap[j][k] + tempMap[j][k];
					this.tempMap[j][k] = 0;
					
				}
			}
		}
	}
}

function createCalendar() {
    let nav = 0;
    let clicked = null;

    const calendar = dom.window.document.getElementById('calendar');
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    function load() {
        var date = new Date();

        for (let x = 0; x < 25; x++) {

            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();

            //this displays the month and year for each month
            const monthYearDisplay = dom.window.document.createElement('div');
            monthYearDisplay.setAttribute('id', 'header');
            monthYearDisplay.innerText = date.toLocaleDateString('en-us', { month: 'long' }) + ", " + year;
            calendar.appendChild(monthYearDisplay);

            //displays the days of the week for each month
            const days = dom.window.document.createElement('div');
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
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const firstDayOfMonth = new Date(year, month, 1);

            const firstDay = firstDayOfMonth.toLocaleDateString('en-us', { weekday: 'long', });

            const emptyDays = weekdays.indexOf(firstDay);

            //creates the calander for a spesific month
            for (let i = 1; i <= emptyDays + daysInMonth; i++) {
                const daySquare = dom.window.document.createElement('div');
                daySquare.classList.add('day');

                if (i > emptyDays) {
                    daySquare.innerText = i - emptyDays;
                } else {
                    daySquare.classList.add('padding');
                }

                calendar.appendChild(daySquare);
            }

            const block = dom.window.document.createElement('div');
            block.classList.add('space');
            calendar.appendChild(block);
            date = new Date(date.setMonth(date.getMonth() + 1));
        }

    }

    load();
}

