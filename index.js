const fs = require('fs');
// var sleep = require('sleep');

function readFilePromise(path) {
  // psst, the promise should be around here...
  return new Promise((resolve, reject) => {
    fs.readFile(path, function(err, data) {
      if(err) {
        reject(err)
      } else {
        resolve(JSON.parse(data))
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  let dataParents = []
  return new Promise((resolve, reject) => {
    readFilePromise(parentFileName)
      .then((dataParent) => {
        dataParents = dataParent
        return readFilePromise(childrenFileName)
      })
      .then((dataChildren) => {
        for(let i = 0; i < dataParents.length; i++) {
          let children = []
          for(let j = 0; j < dataChildren.length; j++) {
            if(dataParents[i].last_name === dataChildren[j].family) {
              children.push(dataChildren[j].full_name)
            }
          }
          dataParents[i].children = children
        }
        resolve(dataParents)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json')
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(`Err read file `, err)
  })
console.log("Notification : Data sedang diproses !")

// // for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json')
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(`ERR read file : `, err)
  })

matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json')
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(`ERR read file : `, err)
  })
  