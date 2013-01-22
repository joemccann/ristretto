var ncr = require('nodecr')
  , request = require('request')
  , path = require('path')
  , mocha = require('mocha')
  , should = require('should')
  , BetterError = require('../lib/bettererror')
  , ristretto = require('../lib/ristretto')
  , goodImgUrl = 'https://www.google.com/images/srpr/logo3w.png' 
  , notImgUrl = 'https://www.google.com' 
  , brokenUrl = 'http://asdfkljaklsdfj.com'
  , notUrl = 'foo-bar.baz'

String.prototype.trim = function () {
   return this.replace(/^\s+/, '').replace(/\s+$/, '');
 }

ristretto.setImagesDirectory( path.resolve(__dirname, '..', 'images') )


describe('Ristretto', function(){
  describe('#ocrFromUrl', function(){
    
    it('Should be equal to the text "Google"', function(done){
      
      ristretto.ocrFromUrl(goodImgUrl, function(err,data){
        if(err){
          return done(err)
        }
        else{
           data = data.trim()
           should.strictEqual(data, "Google")
           done()

        } // end else

      }) // end ocrFromUrl
      
      
    }) // end it
  }) // end describe
}) // end describe outer


describe('Ristretto', function(){
  describe('#ocrFromUrl', function(){
    
    it('Should match the error message of not being a proper URL.', function itCb(done){
      
      ristretto.ocrFromUrl(notUrl, function improperUrlCb(err,data){
        if(err){
          should.equal(err.message, 'URL is not a URL')
          done()
        }
        else{
          done(new Error('This works?'))
        }

      })
      
    }) // end it
  }) // end describe
}) // end describe outer


describe('Ristretto', function(){
  describe('#ocrFromUrl', function(){
    
    it('Should match the error message of not being an image.', function(done){
      
      ristretto.ocrFromUrl(notImgUrl, function(err,data){
        if(err){
          should.equal(err.message, 'This is not an image according to its content-type header.')
          done()
        }
        else{
          done(new Error('This works?'))
        }

      })
      
    }) // end it
  }) // end describe
}) // end describe outer


describe('Ristretto', function(){
  describe('#ocrFromUrl', function(){
    
    it('Should match the error of a bad url.', function(done){
      
      // // This url is purposely borked and doens't work
      ristretto.ocrFromUrl(brokenUrl, function(err,data){
        if(err){
          should.equal(err.message, "HTTP Client issue: getaddrinfo ENOENT")
          done()
        }
        else{
          done(new Error('This Works?'))
        }

      })
            
    }) // end it
  }) // end describe
}) // end describe outer