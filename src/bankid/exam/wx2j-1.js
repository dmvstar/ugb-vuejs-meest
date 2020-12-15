var fs = require('fs'),
    xml2js = require('xml2js');
 
var parser1 = new xml2js.Parser();
var parser2 = require('fast-xml-parser');

fs.readFile(__dirname + '/find-client-1.xml', function(err, data) {
    parser1.parseString(data, function (err, result) {
        console.log(JSON.stringify(result, null, 2));
        console.log('Done');
    });
    var jsonObj = parser2.convertToJson(data);
    console.log(JSON.stringify(jsonObj, null, 2));

});


