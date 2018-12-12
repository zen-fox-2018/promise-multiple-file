const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(namaFile) {
  // psst, the promise should be around here...

  let promise = new Promise(function (resolve, reject) {
    fs.readFile(namaFile, 'utf8', function (err, data) {
      if (err) {
        reject(err)
      }
      else {
        resolve(data)
      }
    })
  })

  return promise

}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  let parent_data = []
  readFilePromise(parentFileName)
    .then(function (data) {
      parent_data = JSON.parse(data)
      return readFilePromise(childrenFileName)
    })
    .then(function (data2) {
      let children_data = JSON.parse(data2)
      for (let i = 0; i < parent_data.length; i++) {
        parent_data[i]['childrens'] = []
        for (let j = 0; j < children_data.length; j++) {
          if (parent_data[i].last_name === children_data[j].family) {
            parent_data[i]['childrens'].push(children_data[j].full_name)
          }
        }
      }
      sleep.sleep(3)
      console.log(parent_data)
    })
    .catch(function(err){
      console.log(err)
    })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');