[![Build Status](https://travis-ci.org/HaCSBCU/MesaHub.svg?branch=master)](https://travis-ci.org/HaCSBCU/MesaHub)


# Building the project

This project was built on node v6 (boron).

This project uses docker-compose to build

You can run everything with `$ docker-compose up` and reach it at [localhost:8000](http://localhost:8000)


# Adding authentication to routes

A custom authentication module has been built to verify whether a user is signed in or not before they can access an protected route in the API.

Firstly, require the correct module, the module folder can be found in the root of the app:

```js
var auth = require('./auth/authentication.js')
```

Now, consider a simple root like so:

```js
app.get('/protected', function(req, res){
  res.render('/pages/admin');
}
```

To protect this root, the client session cookie must be obtained like so:

```js
app.get('/protected', function(req, res){
  var id = req.cookies.uID;
  res.render('/pages/admin');
}
```

Then authentication used by referencing the module:

```js
app.get('/protected', function(req, res){
  var id = req.cookies.uID;
  if(id){
    auth.verifySession(id, function(data){
        if(data.validated == true){
          res.render('/pages/admin');
        }
        else{
          res.redirect('/');
        }
    });
  }
}
```
