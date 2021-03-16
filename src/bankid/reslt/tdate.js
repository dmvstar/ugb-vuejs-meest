var sdate = '2021-03-16T22:17:38.343Z'
var ddate = new Date(sdate)

console.log(ddate.toISOString())
myTZO = 2;
var ldate=new Date(ddate.getTime() - (60000*(ddate.getTimezoneOffset()-myTZO)));
console.log(ldate.toISOString())



