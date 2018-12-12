const fs = require('fs');
const sleep = require('sleep');

function readFilePromise(dataPath) {
  sleep.sleep(2)
  let promise = new Promise (function (resolve, reject) {
    let data = fs.readFile(dataPath, 'utf8', function(err, data) {
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
  let parentData = null
  let childrenData = null
  readFilePromise(parentFileName)
    .then(function(parent) {
      parentData = JSON.parse(parent)
      return readFilePromise(childrenFileName)
    })
    .then(function(children) {
      childrenData = JSON.parse(children)

      for (let i = 0; i < parentData.length; i++) {
        parentData[i]["childrens"] = []
      }
      for (let i = 0; i < parentData.length; i++) {
        for (let j = 0; j < childrenData.length; j++) {
          if (childrenData[j].family === parentData[i].last_name) {
            parentData[i].childrens.push(childrenData[j].full_name)
          }
        }
      }
      console.log(parentData);
    })
    .catch(function(err) {
      console.log(`Terjadi error pada proses pembacaan data`);
      console.log(err);
    })

}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');