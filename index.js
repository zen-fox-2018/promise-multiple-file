const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise((resolve, reject) => {

    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        throw err;
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(err);
        }
      }
    });

  });

}


function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)

  var promiseData = [];

  return readFilePromise(parentFileName)
    .then((data) => {
      sleep.sleep(5);

      promiseData = JSON.parse(data);

      return readFilePromise(childrenFileName)
    })

    .then(data => {
      sleep.sleep(5);
      let children = JSON.parse(data);

      for (let i = 0; i < promiseData.length; i++) {

        promiseData[i].children = [];
        
        for (let j = 0; j < children.length; j++) {
          if (promiseData[i].last_name === children[j].family) {
            promiseData[i].children.push(children[j].full_name);
          }
        }
      }      
    })

    .catch((err) => {
      console.log(err);
    });
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// // for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');