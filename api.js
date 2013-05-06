var restify = require('restify')
  , path = require('path')
  , restify = require('restify')
  , ristretto = require('./lib/ristretto')

var server = restify.createServer()

server.use(restify.queryParser())
server.use(restify.jsonp())
server.use(restify.gzipResponse())
server.use(restify.bodyParser({keepExtensions: true, uploadDir: __dirname + '/images/'}))

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


function respondPost(req, res, next){
  
  var formObj = req.files.upload  

  ristretto.ocrFromFormObject(formObj, function(err,data){
  
    if(err){
      return res.json(err)
    }
    else{
      return res.json(200, {ocr_text: data})
    } // end else

  }) // end ocrFromUrl
}



// example: http://0.0.0.0:8080/api/1?url=https://www.google.com/images/srpr/logo3w.png
// should respond with: { ocr_text: "Google "}

server.get('/api/1?:url', respond)
server.head('/api/1?:url', respond)

//server.post('/api/1', respondPost)


server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url)
})