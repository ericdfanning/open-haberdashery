const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const port = 8888
app.set('port', port);
app.listen(app.get('port'), function() {
  console.log('Listening on port: ', port)
});

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
}
app.use(allowCrossDomain);
// app.use(cors());
app.use(express.static(path.join(__dirname, './dist')));

app.use(bodyParser.text());
// app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req, res) {

  res.status(200)
  res.send()
})

app.get('/manifest.json', function(req, res) {
	res.sendFile(path.join(__dirname, '/src/manifest.json'))
})

app.get('/icons/ericFace*', function(req, res) {
	res.sendFile(path.join(__dirname, `/icons/${req.originalUrl.split('/icons/')[1]}`))
})

app.get('/sw.js', function(req, res) {
	res.sendFile(path.join(__dirname, '/src/sw.js'))
})

app.get('/items', function(req, res) {
	fs.readFile('../../../Desktop/openHAB-state.txt', 'utf8', (err, data) => {
	    if (err) throw err;
	    let responseObj = {};
	    let body = '';
	    let results = JSON.parse(data);

	// console.log('in the server results', results)
	    // fs.writeFile("activeThings.txt", JSON.stringify(filteredData), (err) => { 
	    //   if (err) 
	    //     console.log(err); 
	    //   else { 
	    //     console.log("File written successfully\n"); 
	    //     console.log("The written has the following contents:"); 
	    //   } 
	    // });

  		res.status(200)
  		res.send(results)
	    // console.log('whats the data', Object.values(JSON.parse(data)));
	});
})

app.post('/update', function(req, res) {

	console.log('req body', req.body, req.method)
	res.status(200)
	res.send()
})
