var test = [
    '123',
    '23.988',
    '23,988',
    '01.12.2010',
    '01.12.2010@11'
]

for(t of test){
    console.log(t, isNaN(t), parseInt(t), parseFloat(t))
}

var dat = new Date();
console.log(dat, dat.toISOString(), dat.toLocaleTimeString());
var tsdat = dat.toISOString().substring(0,10).replace(/-/g,'')+'-'+
dat.toLocaleTimeString().replace(/:/g,'').replace(/ /g,'');

console.log(tsdat);