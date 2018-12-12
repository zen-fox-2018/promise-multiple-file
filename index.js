const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      sleep.sleep(2)
      err? reject(err): resolve(JSON.parse(data))
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  let parentData = []
  readFilePromise(parentFileName)
    .then(parent => {
      parentData = parent
      return readFilePromise(childrenFileName)
    })
    .then(childrenData => {
      parentData.forEach(parent => {
        parent.children = []
        childrenData.forEach(child => {
          child.family === parent.last_name ? parent.children.push(child.full_name): false
        });
      });
      console.log(parentData);
    })
    .catch(err => {
      console.log({msg: 'Terjadi error pada proses pembacaan data', err: err});
    })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');