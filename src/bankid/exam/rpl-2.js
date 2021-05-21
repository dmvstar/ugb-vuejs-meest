var dat = {
    "result": "error",
    "code": 1502,
    "time": "Work time is: 1.678 sec.",
    "path": "/openbanking/bankid/client",
    "message": "Шото пошло не так",
    "details": "Critical error. Reply 500 error unhandled",
    "error": {
        "message": "TypeError: Cannot read property 'replace' of undefined",
        "source": {
            "id": "f79fc7b2.086a1",
            "type": "function",
            "name": "defaults+invalud",
            "count": 1
        }
    },
    "data": {}
}

console.log(dat);

var out = JSON.parse(JSON.stringify(dat).replace(/'/g, ''));

console.log(out);
