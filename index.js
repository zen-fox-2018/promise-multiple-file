const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(parent_file) {
  return new Promise(function(resolve,reject){
        fs.readFile(parent_file,'utf8', (err,data)=>{ 
          if(err){
            reject(err)
          }else{
            resolve(data)
          }
        })
  })
 
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  let rawdataParent = ''
    readFilePromise(parentFileName)
      .then(function(parentData){
        rawdataParent = JSON.parse(parentData)
        return readFilePromise(childrenFileName)
      })
      .then((childrenData)=>{
       let rawDataChildren = JSON.parse(childrenData)
        for(let i = 0; i < rawdataParent.length; i++){

          if(rawdataParent[i].children === undefined){
            rawdataParent[i].children = []
          }

          for(let j = 0; j < rawDataChildren.length; j++){
            if(rawdataParent[i].last_name == rawDataChildren[j].family){
              rawdataParent[i].children.push(rawDataChildren[j].full_name)
            }
          }
        }
        sleep.sleep(3)
        console.log(rawdataParent)
        
      })
      .catch((err)=> {
        console.log(err)
      })
    
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// // for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');