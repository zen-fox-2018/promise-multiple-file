const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (!err) {
        resolve(JSON.parse(data))
      } else {
        reject(err, null)
      }
    })
  })
}

let parentData = null; //ASK if it's necessary

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
    .then(function(parentsData) {
      parentData = parentsData
      sleep.sleep(5)
      return readFilePromise(childrenFileName)
    })
    .then(function(childrensData) {
      for (let i = 0; i < parentData.length; i++) {
        parentData[i].children = []
          for (let j = 0; j < childrensData.length; j++) {
            if (parentData[i].last_name === childrensData[j].family) {
              parentData[i].children.push(childrensData[j].full_name)
            }
          }
        }
      console.log(parentData)
    })
    .catch(function(err) {
      console.log(`Terjadi error pada proses pembacaan data ${err}`)
    })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');