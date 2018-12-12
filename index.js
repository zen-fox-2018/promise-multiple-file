const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(pathFile) {
  // psst, the promise should be around here...
  return new Promise ((resolve, reject)=> {
    fs.readFile(pathFile,'utf8', (err,data)=> {
      if(err) reject(err)
      else resolve(data)
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  let tempParent = []
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  
  readFilePromise(parentFileName).then((dataParent)=> {
    sleep.sleep(5)
    tempParent = JSON.parse(dataParent)
    return readFilePromise(childrenFileName)
  }).then((dataChildren)=> {
    dataChildren = JSON.parse(dataChildren)
    for(let i = 0;i < tempParent.length; i++) {
      tempParent[i].children = []
      for(let j = 0; j < dataChildren.length; j++) {
        if(tempParent[i].last_name == dataChildren[j].family) {
          tempParent[i].children.push(dataChildren[j].full_name)
        }
      }
    }
    console.log(tempParent);
  }).catch((err)=> {
    console.log(err);
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');