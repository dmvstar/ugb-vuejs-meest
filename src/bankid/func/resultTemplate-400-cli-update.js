//Reply 400 error bad fmt or field formats
//resultTemplate-400-cli-update.js
msg.statusCode = 400;
var path = '';
var errorCode = 1402;
var result = 'error';
var data = {};
var error = msg.payload;
var message = "Помилка оновлення а...";
var details = "Error... Reply 400 error ";
//----------------------------------------
msg.workTime = 'Work time is: ' + ((Date.now() - msg.workStart) / 1000) + ' sec.';

if (msg.req !== undefined)
    path = msg.req.route.path;
if (error.statusCode !== undefined)
    msg.statusCode = error.statusCode;
if (error.message !== undefined)
    message = error.message;
if (error.details !== undefined)
    details = error.details;
if (error.codeRe !== undefined)
    errorCode = error.codeRe;

msg.payload = {
    result: result,
    code: errorCode,
    time: msg.workTime,
    path: path,
    message: message,
    details: details,
    error: error,
    data: data
}

return msg;