// @WHERE resultTemplate-200-has-errors-X.js
// Chech has errors for reply
// msg.out.result - result from execute LS service

if(msg.out.result.hasErrors === "true" || 
    (msg.out.result.errors !== undefined && 
        msg.out.result.errors !== "")
) {
    return (null, msg);
}
else {
    return (msg, null);
}    

