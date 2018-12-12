const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(files) {
  return new Promise((resolve, reject) => {
    fs.readFile(files, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(data));
      }
    })
  })
}

let parentsFiles = null;
function matchParentsWithChildrens(parentFileName, childrenFileName) {
  readFilePromise(parentFileName)
    .then((parentsData) => {
      parentsFiles = parentsData;
      sleep.sleep(5);
      return readFilePromise(childrenFileName);
    })
    .then((childrensData) => {
      for (let i = 0; i < parentsFiles.length; i++) {
        parentsFiles[i].children = [];
        for (let j = 0; j < childrensData.length; j++) {
          if(parentsFiles[i].last_name === childrensData[j].family) {
            parentsFiles[i].children.push(childrensData[j].full_name);
          }
        }
      }
      console.log(parentsFiles);
    })
    .catch((err) => {
      console.log('Terjadi error pada proses pembacaan data');
      console.log(err);
    })
  
}

matchParentsWithChildrens('./parents.json', './childrens.json')
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');


//EXAMPLE
readFilePromise('./parents.json');