const fs = require('fs');
// var sleep = require('sleep');

function readFilePromise(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf8", function(err, data){
      if(err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {

  let parentData = null;
  
  readFilePromise(parentFileName).then(parent => {

    parentData = JSON.parse(parent);
    return readFilePromise(childrenFileName);

  }).then(child => {
    let parsedChild = JSON.parse(child);

    parentData.forEach(element => {
      element.children = [];
      for(let i = 0; i < parsedChild.length; i++) {
        if(element.last_name === parsedChild[i].family) {
          element.children.push(parsedChild[i].full_name);
        }
      }
    });

    return parentData;

  }).then(parent => {
    console.log(parent);
  })
  .catch(err => {
    console.log("Terjadi sebuah error pada proses pembacaan data!", err);
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');