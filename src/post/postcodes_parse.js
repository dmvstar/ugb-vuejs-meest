// Importing the Required Modules 

/*
0 Назва області;
1 Назва району;
2 Назва населеного пункту (повна);
+3 Поштовий індекс населеного пункту;
4 Назва вулиці;
5 Номер будинку;
6 Назва відділення зв'язку;
+7 Поштовий індекс в_дд_лення зв'язку (ВПЗ);

8 Region (Oblast);
9 Distinct (Rayon);
10 Locality;
-11 Postindex Locality;
12 Street;
13 House_numbers;
14 Post office;
-15 Postindex VPZ
*/

const fs = require('fs'); 
const readline = require('readline'); 

// Creating a readable stream from file 
// readline module reads line by line 
// but from a readable stream only. 
const file = readline.createInterface({ 
 input: fs.createReadStream('postcodes_DB_10-09-2018-utf-8.csv'), 
 output: process.stdout, 
 terminal: false
}); 

// Printing the content of file line by 
// line to console by listening on the 
// line event which will triggered 
// whenever a new line is read from 
// the stream 
var count = 0;
console.log("TRUNCATE TABLE postcodes;")
file.on('line', (line) => { 
// if(count > 1 && count < 100) {
 if(count > 1) {
  if(count === 100 ) {
    //file.close();
  }
   

  var record=line.split(';');
  var postindex_loc = record[3];
  var postindex_vpz = record[7];
  var region_ua = record[0];
  var distinct_ua = record[1];
  var locality_ua = record[2].replace(/'/g, "''");
  var house_numbers_ua = record[5];
  var post_office_ua = record[6];  
  var street_type_ua = record[4].split(' ')[0];
  var street_ua = record[4].substring(street_type_ua.length+1).replace(/'/g, "''");

  var region_en = record[8];
  var distinct_en = record[9];
  var locality_en = record[10].replace(/'/g, "''");
  var street_type_en = record[12].split(' ')[0];  
  var street_en = record[12].substring(street_type_ua.length+1).replace(/'/g, "''");
  var house_numbers_en = record[13];
  var post_office_en = record[14];  

  console.log("INSERT INTO postcodes( \
postindex_loc \
,postindex_vpz \
,region_ua ,distinct_ua ,locality_ua \
,street_type_ua \
,street_ua \
,house_numbers_ua ,post_office_ua \
,region_en ,distinct_en ,locality_en \
,street_type_en \
,street_en \
,house_numbers_en ,post_office_en \
) \
VALUES('"+record[3]+"','"+record[7]+"','"
+record[0]+"','"+record[1]+"','"+record[2].replace(/'/g, "''")+
"','"+
street_type_ua+
"','"+
street_ua+
"','"+
record[5]+"','"+record[6]+"','"+record[8]+"','"+record[9]+"','"+record[10].replace(/'/g, "''")+"','"+
street_type_en+
"','"+
street_en+
"','"+record[13]+"','"+record[14]+"');" ); 
 }
 count++;
}); 
