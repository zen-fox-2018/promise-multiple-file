const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(path) {
  // psst, the promise should be around here...
  return new Promise(function(resolve, reject) {
    fs.readFile(path, "utf8", function(err, theData) {
      if (err) {
        reject(err);
      } else {
        resolve(theData);
      }
      sleep.sleep(2)
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  let dataInArrayOfObject = null
  readFilePromise(parentFileName)
  .then(function(theData) {
    dataInArrayOfObject = JSON.parse(theData)
    for (let i = 0; i <= dataInArrayOfObject.length-1; i++) {
      dataInArrayOfObject[i]["childrens"] = []
    }

    return readFilePromise(childrenFileName)
  })
  .then(function(theData) {
    let dataChildren = JSON.parse(theData)
    for (let i = 0; i <= dataInArrayOfObject.length-1; i++) {
      for (let j = 0; j <= dataChildren.length-1; j++) {
        if (dataChildren[j].family === dataInArrayOfObject[i].last_name) {
          dataInArrayOfObject[i].childrens.push(dataChildren[j].full_name)
        }
      }
    }
    console.log(dataInArrayOfObject)
  }
  )
  .catch(function(err) {
    console.log("Terjadi error pada proses pembacaan data")
    console.log(err)
  })

}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');