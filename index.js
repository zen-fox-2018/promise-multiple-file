const fs = require('fs');
// var sleep = require('sleep');

function readFilePromise(path) {
  return new Promise((res, rej) => {
    fs.readFile(path, (err, data) =>{
      if(err) {
        rej(err)
      } else {
        res(JSON.parse(data))
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  let result = []
  return new Promise((res, rej) => {
    readFilePromise(parentFileName)
      .then(dataParent => {
        result = dataParent
        return readFilePromise(childrenFileName)
      })
      .then(dataChild => {
        result.forEach(parent => {
          parent.childrens = dataChild.filter((children)=> children.family === parent.last_name).map((name)=> name.full_name)
        });
        res(result)
      })
      .catch(err => {
        rej(err)
      })
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json')
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(`ERR pada proses pembacaan data : `, err)
  })
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json')
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(`ERR pada proses pembacaan data : `, err)
  })

matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json')
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(`ERR pada proses pembacaan data : `, err)
  })