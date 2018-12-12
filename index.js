const fs = require('fs');
// var sleep = require('sleep');

function readFilePromise(path) {
  return new Promise ((resolve, reject) => {
    fs.readFile(path, "utf8", function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(data))
      }
    })
  })
  // psst, the promise should be around here...
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  let dataParents = null
  return new Promise((resolve, reject)=> {
    readFilePromise(parentFileName)
      .then((dataParent) => {
        dataParents = dataParent
        return readFilePromise(childrenFileName)
      })
      .then((datachildren) => {
        dataParents.forEach(element => {
            datachildren.forEach(child => {
              if (element.last_name === child.family) {
                if (element.childrens === undefined) {
                    element.childrens = []
                }
                element.childrens.push(child.full_name)
              }
            })
        });
        resolve(dataParents)
      })
      .catch((err) => {
        reject(err)
      })
  })
  // your code here... (p.s. readFilePromise function(s) should be around here..)
}

matchParentsWithChildrens('./parents.json', './childrens.json')
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })

console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json')
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json')
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })