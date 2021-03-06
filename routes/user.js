const { response } = require('express');
const express = require('express');
const router = express.Router();
const UserModel = require('./models/User.Model');
const jwt = require('jsonwebtoken');
const auth_middleware = require('./auth_middleware.js')

router.get('/findAll', function(request, response) {
    UserModel.getAllUsers()
        .then((userResponse) => {
            response.status(200).send(userResponse)
        })  
        .catch(error => response.status(400).send(error))
})

router.get('/whoIsLoggedIn', auth_middleware, function(request, response) {
    const username = request.session.username;
    return response.send(username);
})

// router.get('/whoIsLoggedInButWithoutMiddleware', function(request, response) {
//     const username = request.session.username;
//     return response.send(username);
// })


router.get('/:username', (request, response) => {
  const username = request.params.username;
  if(!username) {
    return response.status(422).send("Missing data");
  }
  
  return UserModel.findUserByUsername(username)
    .then((userResponse) => {
        if(!userResponse) {
            response.status(404).send("User not found");
        }
        response.send(userResponse)
    })
    .catch((error) => response.status(500).send("Issue getting user"))
})

router.post('/authenticate', function(request, response) {
    let { username, password } = request.body;
    if (!username || !password) {
        return response.status(422).send('Must include both password and username');
    }

    return UserModel.findUserByUsername(username)
        .then((userResponse) => {
            if (!userResponse) {
                return response.status(404).send("No user found with that username");
            }
            if (userResponse.password === password) {
                request.session.username = username;
                return response.status(200).send({username});
            } else {
                return response.status(404).send("No user found with that password");
            }
        })
        .catch((error) => console.error(`Something went wrong: ${error}`));
})


router.post('/', function(req, res) {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username || !password) {
        return res.status(422).send("Missing username: " + username + "or password:" + password)
    }
    return UserModel.insertUser({username: username, password: password})
        .then((userResponse) => {
            req.session.username = username;
            return res.status(200).send({username});
        })
        .catch(error => res.status(422).send(error))

});

router.post('/logout', function(req, res) {
    req.session.destroy()
    return res.send("Ok");
})

router.put('/updateUser/:userName', auth_middleware, (request, response) => {
    const name = request.params.userName;
    const user = request.body;
    if(!user.username || !user.password) {
      return response.status(422).send("Missing data");
    }
    UserModel.updateUserByName(name, user)
      .then(userResponse => response.status(200).send(userResponse))
      .catch(error => response.status(400).send(error))
  })

module.exports = router;
