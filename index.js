const fs = require('fs');
// const sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  const filePromise = new Promise (function(resolve, reject) {
    fs.readFile (file, 'utf8', function(err, data) {
      if (err) {
        reject(err)
      }else{
        resolve(data)
      }
    })
  })
  return filePromise
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
    .then(function(dataParent) {
      readFilePromise(childrenFileName)
        .then(function(dataChildern){
          let parent = JSON.parse(dataParent)
          let child = JSON.parse(dataChildern)
          for(let i = 0; i < parent.length; i++) {
            let childern = []
            for(let j = 0; j < child.length; j++) {
              if(child[j].family == parent[i].last_name) {
                childern.push(child[j].full_name)
              }
            }
            parent[i].childern = childern
          }
          console.log(parent)
        })
    })
    .catch (function(err) {
      console.log('Terjadi error pada proses pembacaan data.',err)
    })


}

// matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');