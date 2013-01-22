var restify = require('restify')
  , path = require('path')
  , restify = require('restify')
  , ristretto = require('./lib/ristretto')

// Required...  
ristretto.setImagesDirectory( path.resolve(__dirname, 'images') )

// Basic response handler...
function respond(req, res, next) {
  
  var url = req.params.url

  ristretto.ocrFromUrl(url, function(err,data){
    if(err){
      return res.json(err)
    }
    else{
      return res.json(200, {ocr_text: data})
    } // end else

  }) // end ocrFromUrl

}

var server = restify.createServer()

// example: http://0.0.0.0:8080/api/1/https%3A%2F%2Fwww.google.com%2Fimages%2Fsrpr%2Flogo3w.png
server.get('/api/1/:url', respond)
server.head('/api/1/:url', respond)

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url)
})