const fs = require('fs');
const sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  sleep.sleep(1)
  return new Promise(function (resolve, reject) {
    fs.readFile(file, 'utf8', function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  let parent_data = null
  let children_data = null

  readFilePromise(parentFileName)
    .then(data => {
      parent_data = JSON.parse(data)

      return readFilePromise(childrenFileName)
    })
    .then(data => {
      children_data = JSON.parse(data)

      for (let i = 0; i < parent_data.length; i++) {
        for (let j = 0; j < children_data.length; j++) {
          if (!parent_data[i]['children']) {
            parent_data[i]['children'] = []
          }
          if (children_data[j].family == parent_data[i].last_name) {
            parent_data[i]['children'].push(children_data[j].full_name)
          }
        }
      }

      console.log(parent_data)

    })
    .catch(err => {
      console.log(err, 'Proses match data Error')
    })

}

console.log("Notification : Data sedang diproses !");
matchParentsWithChildrens('./parents.json', './childrens.json');

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
