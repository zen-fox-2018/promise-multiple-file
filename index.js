const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise((resolve, reject) => {
    let readFile = fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    })


  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  let parentsData = [];
  readFilePromise(parentFileName)
    .then((parents) => {
      parentsData = parents;
      return readFilePromise(childrenFileName);
    })

    .then((childrens) => {
      parentsData.forEach( p => {
        p.childrens = []
        childrens.forEach( c => {
          if (c.family === p.last_name) {
            p.childrens.push(c.full_name)
          }
        })
      })
      console.log(parentsData);
    })

    .catch((err) => {
      console.log(`Terjadi error pada proses pembacaan data, ERR: ${err}`);
    })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");
sleep.sleep(3);

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
