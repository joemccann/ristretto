var http = require('http')
  , fs = require('fs')
  , formidable = require('formidable')
  , util = require('util')
  , path = require('path')
  , ristretto = require('./lib/ristretto')

ristretto.setImagesDirectory( path.resolve(__dirname, 'images') )

http.createServer(function (req, res){
  
  if(req.url == '/'){

    return serveIndex(req,res)

  }else if(req.url === '/favicon.ico'){

    return serveFavicon(req,res)

  }else{

    return serve404(req,res)

  }


}).listen(1337, '127.0.0.1')

function serveIndex(req,res){

  // If it's a post, it's an upload...
  if (req.method.toLowerCase() == 'post'){
    
    var form = new formidable.IncomingForm()
    
    form.keepExtensions = true

    return form.parse(req, function(err, fields, files) {

     var img = files.upload

     // process with tesseract
     ristretto.ocrFromFormObject(img, function(err, data){
       if(err) console.error(err)
       res.writeHead(200, {'content-type': 'text/plain'});
       res.write('Text:\t' + data);
       res.write('received upload:\n\n');
       res.end(util.inspect({fields: fields, files: files}));
     })
     
    }) // end form.parse

  }
  
  var index = { headers:null, body:null }

  if(index.headers){
    res.writeHead(200, index.headers)
    res.end(index.body)
  }else{
    fs.readFile('./public/index.html',function(err,data){
      index.headers = {'Content-Type': 'text/html', 'Content-Length': data.length}
      index.body = data  
      res.writeHead(200, index.headers)
      res.end(index.body)
    })
  }    

  
}

function serveFavicon(req,res){

  var icon = { headers:null, body:null }

  if(icon.headers){
    res.writeHead(200, icon.headers)
    res.end(icon.body)
  }else{
    fs.readFile('./public/favicon.ico',function(err,data){
      icon.headers = {'Content-Type': 'image/x-icon', 'Content-Length': data.length}
      icon.body = data  
      res.writeHead(200, icon.headers)
      res.end(icon.body)
    })
  }    

  
}

function serve404(req,res){

  var four = { headers:null, body:null }

  if(four.headers){
    res.writeHead(200, four.headers)
    res.end(four.body)
  }else{
    fs.readFile('./public/404.html',function(err,data){
      four.headers = {'Content-Type': 'text/html', 'Content-Length': data.length}
      four.body = data  
      res.writeHead(200, four.headers)
      res.end(four.body)
    })
  }    

  
}

console.log('Server running at http://127.0.0.1:1337/')