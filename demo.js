var ncr = require('nodecr')
  , request = require('request')
  , fs = require('fs')
  , path = require('path')
  , ristretto = require('./lib/ristretto')
  , goodImgUrl = 'https://www.google.com/images/srpr/logo3w.png' // Change this to your image
  , notImgUrl = 'https://www.google.com' 
  , brokenUrl = 'http://asdfkljaklsdfj.com'

// Required or defaults to __dirname
ristretto.setImagesDirectory( path.resolve(__dirname, 'images') )

// This example works...
ristretto.ocrFromUrl(goodImgUrl, function(err,data){
  if(err){
    return console.error(err)
  }
  else{
    
    String.prototype.trim = function () {
       return this.replace(/^\s+/, '').replace(/\s+$/, '');
     }
     
    console.log("Text should be:  Google")
    data = data.trim()
    console.log(data == 'Google')
    console.log(data === 'Google' ? "Text matches." : "Text does not match.")
  }

})

// This example turns out not be an image and fails.
ristretto.ocrFromUrl(notImgUrl, function(err,data){
  if(err){
    return console.error(err)
  }
  else{
    console.log("This Works?")
    console.log(data)
  }

})


// This url is purposely borked and doens't work
ristretto.ocrFromUrl(brokenUrl, function(err,data){
  if(err){
    return console.error(err)
  }
  else{
    console.log("This Works?")
    console.log(data)
  }

})