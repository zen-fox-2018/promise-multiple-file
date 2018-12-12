const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  var promise = new Promise(function(resolve, reject) {
    fs.readFile(file, 'utf8', function(err, data) {
      sleep.sleep(1);
      if (!err) {
        var dataParsed = JSON.parse(data);
        resolve(dataParsed);
      }
      else {
        reject(err);
      }
    })
  });
  return promise;
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  var dataParents = null;
  readFilePromise(parentFileName)
    .then(function(dataParsedParents){
      dataParents = dataParsedParents;
      return readFilePromise(childrenFileName)
    })

    .then(function(dataParsedChildrens) {
      for (var i = 0; i < dataParents.length; i++) {
        var fill = [];
        for (var j = 0; j < dataParsedChildrens.length; j++) {
          if (dataParents[i].last_name == dataParsedChildrens[j].family) {
            fill.push(dataParsedChildrens[j].full_name);
          }
        }
        dataParents[i].childrens = fill;
      }
      console.log(dataParents);
    })

    .catch(function(err) {
      console.log('ada error');
      console.log(err);
    })

    // console.log(parentsData);
}


matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");
//
// // for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
