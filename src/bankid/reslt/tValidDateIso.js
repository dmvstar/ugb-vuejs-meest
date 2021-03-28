var sdate = '2021-03-16T22:17:38.343Z'
var ddate = new Date(sdate)

console.log( sdate )
console.log( ddate.toISOString() )

function dt2ldt(zDate) {
    myTZO = 2;
    var ldate=new Date(zDate.getTime() - (60000*(zDate.getTimezoneOffset()-myTZO)));
    return ldate;
}
var ldate = dt2ldt(ddate) ;
console.log(ldate.toISOString())

//ldate = dt2ldt(new Date()) ;
//console.log(ldate.toISOString())

console.log('----------------- dates')
console.log( new Date().toISOString() )
console.log( dt2ldt(new Date() )  )
console.log('----------------- dates')



