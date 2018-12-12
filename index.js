const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, `utf8`, function (err, data) {
      err ?
        reject(err) :
        resolve(JSON.parse(data))
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  let parentData;
  let childrenData;
  readFilePromise(parentFileName).then((result) => {
    parentData = result
    return readFilePromise(childrenFileName)
  }).then((result) => {
    childrenData = result
    for (let i = 0; i < parentData.length; i++) {
      let childrens = []
      for (let j = 0; j < childrenData.length; j++) {
        childrenData[j].family == parentData[i].last_name && childrens.push(
          childrenData[j].full_name
        )
      }
      parentData[i].childrens = childrens

    }
    console.log(parentData);

  }).catch((err) => {
    console.log(err);
  })

}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');