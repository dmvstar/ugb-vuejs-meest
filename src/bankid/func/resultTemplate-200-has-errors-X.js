// @WHERE resultTemplate-200-has-errors-X.js
// Chech has errors for reply
// msg.out.result - result from execute LS service

var result = msg.out.result;
var isError = (result.hasErrors === "true" || 
    (result.errors !== undefined && 
     result.errors !== "") );

if(isError) {
    return [null, msg];
}
else {
    return [msg, null];
}    

