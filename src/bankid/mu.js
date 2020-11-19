var mustache = require("mustache");

var view = {
  title: "Joe",
  calc: function () {
    return 2 + 4;
  }
};
 
var output = mustache.render("{{title}} spends {{calc}}", view);

console.log(output);
