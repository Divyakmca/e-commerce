const express = require('express')
const router = express.Router()
const _ = require('lodash')

const {User} = require('../models/user-model')
const {authenticateUser} = require('../middlewares/authentication')


router.post('/register', function(req,res){
    const body = req.body
    const user = new User(body)
    user.save()
      .then(function(user){
          res.send(_.pick(user, ['id','username','email','createdAt']))
      })
      .catch(function(err){
          res.send(err)
      })
})

router.post('/login', function(req,res){
    const body = req.body
    User.findByCredentials(body.email, body.password)
    .then(function(user){
        return user.generateToken()
    })

    .then(function(token){
        res.send({token})
    })
    .catch(function(err){
        res.send(err)
    })
       

})

router.get('/account', authenticateUser, function(req,res){
    const {user} = req
    res.send(user)
    


})

router.delete('/logout', authenticateUser, function(req,res){
    const {user, token} = req
    User.findByIdAndUpdate(user._id, {$pull:{tokens:{token:token}}})
    .then(function(){
        res.send({notice:'successfully logged out' })
    })
    .catch(function(err){
        res.send(err)
    })
})

module.exports = {
    userRouter: router
}