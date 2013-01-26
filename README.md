Ristretto
=

Ristretto is an Optical Character Recognition library and API for fetching remote images from the web. It has nothing to do with Coffee.

Ristretto uses the open source OCR library, Tesseract.

Installation
-

1. Install Tesseract on your machine. On Mac OS X: `sudo brew install tesseract`
2. Clone the repo 
3. `npm i`
4. `node api`
5. Open up http://localhost:8080/api/1/https%3A%2F%2Fwww.google.com%2Fimages%2Fsrpr%2Flogo3w.png in your browser as an example.

To run the tests:

1. `[sudo] npm i mocha -g`
2. `mocha -t 15000 -R spec`

To demo how to upload an image file:

1. `node server`
2. Open up http://localhost:1337
3. Upload the 'google.png' file located in the 'images' directory.

You can also just run `server.js` by itself (no `api.js` needed) to test the file upload piece.  In the `<form>` in `index.html`, just change
`action="http://localhost:8080/api/1"`
to
`action="http://localhost:1337/"`

License
-

MIT, breaux
Copyright(c) 2013 
Joe McCann <joe@subprint.com>