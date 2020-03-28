var express = require('express');
var router = express.Router();
const users_db = require('../db/db').users_db

router.get('/', function(req, res, next) {
  users_db.serialize(() => {
    users_db.all('select * from users', (err, rows) => {
      res.send(rows)
    });
});
});

router.get('/userList', function(req, res, next) {
  users_db.serialize(() => {
    users_db.all('select distinct username from users', (err, rows) => {
      const userList = []
      rows.forEach(element => {
        userList.push(element.username)
      });
      console.log("\nuserList:",userList)
      res.send({userList: userList})
    });
});
})

router.get('/passWord', function(req, res, next) {
  const username = req.query.username
  users_db.serialize(() => {
    users_db.all('select password from users where username == "'+username+'"',
    (err, rows) => {
      console.log(rows[0].password)
      res.send({password: rows[0].password})
    });
});
})

router.get('/userData', function(req, res, next) {
  const username = req.query.username
  users_db.serialize(() => {
    users_db.all('select * from users where username == "'+username+'"',
    (err, rows) => {
      console.log(rows[0])
      res.send({obj: rows[0]})
    });
});
})

router.get('/addUser', function(req, res, next) {
  const username = '"'+req.query.username+'"'
  const password = '"'+req.query.password+'"'
  const sex = '"'+req.query.sex+'"'
  const age = Number(req.query.age)
  const nationality = '"'+req.query.nationality+'"'
  const local = '"'+req.query.local+'"'
  const email = '"'+req.query.email+'"'
  const tel = Number(req.query.tel)
  users_db.serialize(() => {
    users_db.run('insert into users (username, password, sex, age, nationality, local, email, tel) values('+username+','+password+','+sex+','+age+','+nationality+','+local+','+email+','+tel+')',
    (err,rows)=>{
      res.send("success")
    });
});
})

router.get('/deleteUser', function(req, res, next) {
  const username = '"'+req.query.username+'"'
  users_db.serialize(() => {
    users_db.run('delete from users where username == '+username,
    (err,rows)=>{
      res.send("success")
    });
});
})

router.get('/editUser', function(req, res, next) {
  const usernameOrigin = '"'+req.query.usernameOrigin+'"'
  const username = '"'+req.query.username+'"'
  const password = '"'+req.query.password+'"'
  const sex = '"'+req.query.sex+'"'
  const age = Number(req.query.age)
  const nationality = '"'+req.query.nationality+'"'
  const local = '"'+req.query.local+'"'
  const email = '"'+req.query.email+'"'
  const tel = Number(req.query.tel)
  users_db.serialize(() => {
    users_db.run('update users set sex = '+sex+' where username = '+usernameOrigin,
    (err,rows)=>{
    });
    users_db.run('update users set age = '+age+' where username = '+usernameOrigin,
    (err,rows)=>{
    });
    users_db.run('update users set nationality = '+nationality+' where username = '+usernameOrigin,
    (err,rows)=>{
    });
    users_db.run('update users set local = '+local+' where username = '+usernameOrigin,
    (err,rows)=>{
    });
    users_db.run('update users set email = '+email+' where username = '+usernameOrigin,
    (err,rows)=>{
    });
    users_db.run('update users set tel = '+tel+' where username = '+usernameOrigin,
    (err,rows)=>{
    });
    users_db.run('update users set username = '+username+' where username = '+usernameOrigin,
    (err,rows)=>{
      res.send("success")
    });
});
})

module.exports = router;
