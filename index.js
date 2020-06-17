const simpleGit = require('simple-git')();
// Shelljs package for running shell tasks optional
const shellJs = require('shelljs');
// Simple Git with Promise for handling success and failure
const simpleGitPromise = require('simple-git/promise')();
// change current directory to repo directory in local



const express = require('express');
const app = express();
const port = 8000;

app.listen(port,()=> {
   console.log('listen port 8000');
   })

app.put('/', (req,res)=>{
 
   
   shellJs.cd('C:/Users/ca_user1/Desktop/automatejs-master/automatejs-master');
//let folder=process.argv[3];
let folder= req.param('repo_name');
// Repo name
//const repo = 'dum';  //Repo name
// User name and password of your GitHub
const userName = req.param('userName');
const password = req.param('password')
//Set up GitHub url like this so no manual entry of user pass needed

const gitHubUrl = `https://${userName}:${password}@github.com/${userName}/${folder}`;
// add local git config like username and email
simpleGit.addConfig('user.email',req.param('email_id'));
simpleGit.addConfig('user.name',userName);
const {Octokit}  = require("@octokit/rest");
const octo = new Octokit({
   auth: req.param('token')
});
if(req.param('option')==='create')
{
   
   octo.repos.createForAuthenticatedUser({
      name: folder
  }).then(data => {
      console.log("successfully created repo " + folder)
      res.send("successfully created repo")
  }).catch(e => {

      console.log(e);
      res.send(e)
      
   });

   
}

else if( req.param('option')==='push')
{
   simpleGitPromise.removeRemote('origin',gitHubUrl);

// Add remore repo url as origin to repo
simpleGitPromise.addRemote('origin',gitHubUrl);
// Add all files for commit
  simpleGitPromise.add('.')
    .then(
       (addSuccess) => {
          console.log(addSuccess);
        //  res.send(addSuccess)
       }, (failedAdd) => {
          console.log('adding files failed');
         // res.send("adding files failed")
    });
// Commit files as Initial Commit
 simpleGitPromise.commit('Intial commit by simplegit')
   .then(
      (successCommit) => {
        console.log(successCommit);
       // res.send(
     }, (failed) => {
        console.log('failed commmit');
      //  res.send("failed commit")
 });
// Finally push to online repository
 simpleGitPromise.push('origin','master')
    .then((success) => {
       console.log('repo successfully pushed');
       res.send("repo successfully pushed")
    },(failed)=> {
       console.log('repo push failed');
       res.send("repo push failed")
 });

}
else if( req.param('option')==='update')
{
   simpleGitPromise.add('.')
   .then(
      (addSuccess) => {
         console.log(addSuccess);
         res.send(addSuccess)
      }, (failedAdd) => {
         console.log('adding files failed');
         res.send("addingfiles failed")
   });

   // Commit files as Initial Commit
simpleGitPromise.commit(req.param('update_msg'))
 .then(
    (successCommit) => {
      console.log(successCommit);
      res.send(successCommit)
   }, (failed) => {
      console.log('failed commmit');
      res.send("failed commit")
});
// Finally push to online repository
simpleGitPromise.push('origin','master')
  .then((success) => {
     console.log(success);
     res.send(success)
  },(failed)=> {
     console.log('repo update failed');
     res.send("update failed")
});
}
});