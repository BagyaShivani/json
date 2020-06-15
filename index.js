const simpleGit = require('simple-git')();
// Shelljs package for running shell tasks optional
const shellJs = require('shelljs');
// Simple Git with Promise for handling success and failure
const simpleGitPromise = require('simple-git/promise')();

// change current directory to repo directory in local
shellJs.cd('C:/Users/ca_user1/Desktop/automatejs-master');
// Repo name
const repo = 'demo';  //Repo name
// User name and password of your GitHub
const userName = 'BagyaShivani';
const password = 'shivani2904';
//Set up GitHub url like this so no manual entry of user pass needed

const gitHubUrl = 'https://BagyaShivani:shivani2904@github.com/BagyaShivani/dummy';

require('simple-git')()
     .init();
// add local git config like username and email
simpleGit.addConfig('user.email','bagya.shivani@wipro.com');
simpleGit.addConfig('user.name','BagyaShivani');
//simpleGitPromise.removeRemote('origin',gitHubUrl);
// Add remore repo url as origin to repo
simpleGitPromise.addRemote('origin',gitHubUrl);
// Add all files for commit
  simpleGitPromise.add('.')
    .then(
       (addSuccess) => {
          console.log(addSuccess);
       }, (failedAdd) => {
          console.log('adding files failed');
    });
// Commit files as Initial Commit
 simpleGitPromise.commit('Intial commit by simplegit')
   .then(
      (successCommit) => {
        console.log(successCommit);
     }, (failed) => {
        console.log('failed commmit');
 });
// Finally push to online repository
 simpleGitPromise.push('origin','master')
    .then((success) => {
       console.log('repo successfully pushed');
    },(failed)=> {
       console.log("repo push failed");
 });