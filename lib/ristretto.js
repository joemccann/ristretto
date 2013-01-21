
/*!
 * Ristretto
 * Copyright(c) 2013 Joe McCann <joe@subprint.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var ncr = require('nodecr')
  , request = require('request')
  , fs = require('fs')
  , path = require('path')



// Binary image upload --> POST (binary, form data)
// URL of image --> POST (text)

// Check to see it is an image via content-type header
// Check to see it is no more than 10 MB in size

/**
 * Expose `Ristretto`.
 */

module.exports = new Ristretto()

/**
 * Initialize a new `Ristretto` with the given `options`.
 *
 * @param {Object} options
 * @api public
 */

function Ristretto(){
  
  String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str
  }
      
  var self = this
  
  // Check to see if image is in fact an image
  // return boolean
  function _isImage(pathToImage){
    
  }

  // Check to see if string is URL
  // return boolean
  function _isUrl(str){
    return /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/.test(str)
  }

  // Generate randome file name with extension passed in
  function _generateRandomName(fileExt){
    return new Buffer( ( new Date().toString() ) ).toString('base64') + fileExt
  }
  
  // Incoming string is "image/*"
  function _getFileExtensionFromContentType(str){
    return "." + str.split('/').pop()
  }
  
  // Write the image to disk
  function _writeImage(pathToImage, body, options, cb){
    
    // Now actually write the image to disk
    fs.writeFile(pathToImage, body, 'binary', function writeFileToDiskCallback(err) {
      if (err) return cb(err)
      return _processImageWithTesseract(pathToImage, cb, options)
    })

  }
  
  // Pass in the path to the image, a cb (required) and an
  // options hash containing possible flags for Tesseract 
  function _processImageWithTesseract(pathToImage, cb, options){
    
    options = options || {}
    
    var language = options.language || 'eng'
      , pageSegmentationMode = options.segMode || 6

    ncr.process(pathToImage,function(err, text){

        if(err) return cb(err)
        
        // Let's delete the file too...
        fs.unlink(pathToImage, function(err){
          if(err) console.err(err)
          
          return cb(null,text)
          
        }) // end unlink

    }, language, pageSegmentationMode)
    
  }

  return {
    setImagesDirectory: function(path){
      self.imagesDirectory = path || __dirname
    },
    ocrFromUrl: function(url, cb, options){
      
      // Check if url is actual url 
      if( !_isUrl(url) ){
        return(new Error('URL is not a URL'))
      }
      
      // We need to set the encoding here...
      var config = {
          url: url,
          method: 'GET', 
          encoding: 'binary'
        }
      // Fetch url, but snag content-type header
      request(config, function fetchUrlCallback(err, resp, body){
        
        if(err) return cb(err)
        
        if(resp.statusCode >= 399) return cb(new Error('Bad status code: ' + resp.statusCode))

        var contType = resp.headers['content-type']

        // Is it of type image? Will fail in some cases...
        if( !( contType.startsWith("image/") ) ){
          return cb(new Error('This is not an image according to its content-type header.'))
        } 
        
        // Create the image name from the content-type
        var imgName = _generateRandomName( _getFileExtensionFromContentType(contType) )
        
        // Create the full path to the image
        var pathToImage = path.resolve(self.imagesDirectory, imgName)

        return _writeImage(pathToImage, body, options, cb)
        
      }) // end first request
      
    },
    ocrFromBinary: function(pathToBinary, cb){
      return console.warn("Not implemented yet.")
    }
  }

} // end Ristretto object