// --------------------------------------------------------------------------------------
const path = "body";
var validateData,
    validateMapa;
// --------------------------------------------------------------------------------------
var isLocalWork = false;
if (typeof msg === "undefined") {
    isLocalWork = true;
    var msg = {
        payload: {}
    }
}
// --------------------------------------------------------------------------------------
// main recursive function. test payload according to map
function validate(field, fieldMap, path) {
    // node.error("validate start");
    // node.error(path);
    let replies = [];
    // call validation function, based on type in map
    switch (fieldMap.type) {
        case "Object":
            // node.error("type: Obj");
            replies = validateObj(field, fieldMap, path);
            break;
        case "Array": replies = validateArray(field, fieldMap, path);
            break;
        default:
            // node.error("type: Element");
            replies = validateElement(field, fieldMap, path);
    }
    return replies;
}
// function for validating Objects
function validateObj(objField, objMap, path) { // node.error("validateObj start");
    let replies = [];
    // go through all properties in obj.
    for (let property in objMap.contents) {
        let currPath = path + "." + property;
        // node.error(currPath);
        // check if empty and required
        let checkPresenseReply = checkPresense(objField[property], objMap.contents[property], currPath);
        if (checkPresenseReply.empty) {
            replies = replies.concat(checkPresenseReply);
        } else { // if not empty validate properties in object recursively
            let validateElementReply = validate(objField[property], objMap.contents[property], currPath);
            replies = replies.concat(validateElementReply);
        }
    }
    return replies;
}
// function for validating Arrays
function validateArray(arrField, arrMap, path) { // node.error("validateArray start");
    let replies = [];
    // if (arrField.length < arrMap.minLength) {
    //     replies = {
    //         "ok" : false,
    //         "message" : "min length = " + arrMap.minLength,
    //         "path" : path
    //     }
    // }
    let i = 0;
    // go through all contents of array and validate 1 by 1
    do { // check at least once even empty array to make sure empty array is ok in map (no "needed" contents)
        let currPath = `${path}[${i}]`;
        // node.error(currPath);
        // check if empty and required
        let checkPresenseReply = checkPresense(arrField[i], arrMap.contents, currPath);
        if (checkPresenseReply.empty) {
            replies = replies.concat(checkPresenseReply);
        } else { // if not empty validate array cintents one by one recursively
            let validateElementReply = validate(arrField[i], arrMap.contents, currPath);
            replies = replies.concat(validateElementReply);
        } i++;
    } while (i < arrField.length)
    return replies;
}

// validating simple types
function validateElement(element, elemMap, path) {
    // node.error("validateElement start");
    // node.error(path);
    //console.log('   ',path);
    let reply;
    // check if empty and required
    let checkPresenseReply = checkPresense(element, elemMap, path);
    if (checkPresenseReply.empty) {
        reply = checkPresenseReply;
    } else { // if not empty test element by regex
        let testElementReply = testElement(element, elemMap, path)
        reply = testElementReply;
    }
    return reply;
}
// test besic element according to regex (end of recursion)
function testElement(nonObjField, fieldMap, path) {
    let ok = false;

    // let message = fieldMap.message;
    let regexp = new RegExp(fieldMap.express);
    let reply = {
        "ok": false,
        "path": path,
        "value" : nonObjField
    } // test meybe || (nonObjField === undefined || nonObjField === null) is not needed
    if (regexp.test(nonObjField)) {
        ok = true;
    }
    reply.ok = ok;
    return reply;
}
// check if element is present and required by map
function checkPresense(field, fieldMap, path) {
    let ok = true;
    let empty = false;
    // let message = fieldMap.message + ": Обязательное поле отсутствует";
    if (field === undefined || field === null) {
        empty = true;
        if (fieldMap.needed) {
            ok = false;
        }
    }
    let reply = {
        "ok": ok,
        "empty": empty,
        "path": path
    }
    return reply;
}
// --------------------------------------------------------------------------------------

var testNum = 0;
var datas = [1,2,3];

if (!isLocalWork) {
    validateData = msg.validateData;
    validateMapa = msg.validateMapa;
    msg.payload = validate(validateData, validateMapa, path);
    return msg;
} else {
    var validateMapaPath = './validator_map-2.json'
    for (t of datas) {
        testNum = t;
        var validateDataPath = './validator_dat-' + testNum + '.json'
        // validateMapaPath = './validator_map-' + testNum + '.json'
        validateData = require(validateDataPath);
        validateMapa = require(validateMapaPath);
        msg.payload = validate(validateData, validateMapa, path);
        console.log('>-----',validateDataPath);
        console.log(msg.payload);
        console.log('<-----',validateDataPath);
    }
}
