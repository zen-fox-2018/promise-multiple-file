const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(path) {
  // psst, the promise should be around here...
  return new Promise( (resolve , reject) => {
    fs.readFile(path , 'utf8', (err, data) => {
      if (err) {
        reject('Baca file gagal')
      } else {
        resolve(JSON.parse(data))
      }
    })
  }) 
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  let output = []
  sleep.sleep(1) 
  return readFilePromise(parentFileName)
    .then( dataParent => {
      output = dataParent
      return readFilePromise(childrenFileName)
    })
    .then( dataChildren => {
      output.forEach( (a, i) => {
        output[i].childrens = []
        dataChildren.forEach( (b) => {
          if (a.last_name === b.family) {
            output[i].childrens.push(b.full_name)
          }
        })
      })
      console.log(output)
    })
    .catch(err => {
      sleep.sleep(3)
      console.log(err)
    })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');