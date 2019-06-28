const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/e-commerce-app', {useNewUrlParser:true})
   .then(function(){
       console.log('connected to db')
   })
   .catch(function(){
       console.log('error connecting to db')
   })

  
   
module.exports = mongoose

