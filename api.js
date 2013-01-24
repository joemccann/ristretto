var restify = require('restify')
  , path = require('path')
  , restify = require('restify')
  , ristretto = require('./lib/ristretto')

var server = restify.createServer()

server.use(restify.queryParser())
server.use(restify.jsonp())
server.use(restify.gzipResponse())
server.use(restify.bodyParser())

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
  
  var body = req.body
  
  var file = req.files.upload.path
  
  var fs = require('fs')
  
  // console.dir(file)
  
  fs.readFile(file, function(err,data){
    if(err) return console.error(err)
    
    // console.log(data)
    
    fs.writeFile('./images/fodfs.png', data, 'binary', function writeFileToDiskCallback(err) {
      if (err) return cb(err)
      console.log('write')
      res.send('Uploadeded!')
    })
    
    
  })
  
  
  
  return

  ristretto.ocrFromBinary(body, function(err,data){
  
    if(err){
      return res.json(err)
    }
    else{
      return res.json(200, {ocr_text: data})
    } // end else

  }) // end ocrFromUrl
}



// example: http://0.0.0.0:8080/api/1/https%3A%2F%2Fwww.google.com%2Fimages%2Fsrpr%2Flogo3w.png
server.get('/api/1/:url', respond)
server.head('/api/1/:url', respond)

server.post('/api/1', respondPost)


server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url)
})