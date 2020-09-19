function nextDayDate(date, i)
{
        var today = date;
	var nextDay = new Date(date);

        var dd   = nextDay.getDate(); 
        var mm   = nextDay.getMonth();
        var yyyy = nextDay.getFullYear();
        var todayDate = (dd<10?'0'+dd:dd)+'.'+(mm<10?'0'+mm:mm)+'.'+yyyy;
console.log(todayDate)

	nextDay.setDate(day.getDate() + i);
        dd   = nextDay.getDate(); 
        mm   = nextDay.getMonth();
        yyyy = nextDay.getFullYear();
        var nextDate = (dd<10?'0'+dd:dd)+'.'+(mm<10?'0'+mm:mm)+'.'+yyyy;
console.log(nextDate)

        return {
		    todayDate: todayDate,
		    nextDate:  nextDate
		};
}

var day = new Date('2020-09-30');
console.log(day)

var nextDay = new Date(day);

console.log( nextDayDate(day, 2) );