var fs = require("fs");
alert('tre11');
function csvJSON(csv){
  var lines=csv.split("\n");
  var result = [];
  var headers=lines[0].split(",");
  for(var i=1;i<lines.length;i++){
	  var obj = {};
	  var currentline=lines[i].split(",");
	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }
	  result.push(obj);  }  
  //return result; //JavaScript object
   return JSON.stringify(result);
  //return result; //JSON  JSON.stringify()
}
fs.readFile('./assets/data.csv', function (err, data) {
   if (err) {
      return console.error(err);
   }
var writerStream = fs.createWriteStream('./assets/data1.json');
writerStream.write(csvJSON(data.toString()),'UTF8');
console.log(csvJSON(data.toString())[1]);
 });
alert('yes');
