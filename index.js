const fs = require('fs');
var sleep = require('sleep');

function readFilePromise() {
  // psst, the promise should be around here...
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');