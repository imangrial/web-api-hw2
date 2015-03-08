var argo = require('argo');
var express = require('express');

var app = express();

var proxy = argo()
    .target('https://api.usergrid.com')
    .build();

// Function to count number of properties in an object
function countObjectProperties(obj) {
    return Object.keys(obj).length;
}

// This will be the default response for any unsupported responses.
app.all('/', function(req, res) {
    res.send('Client requesting invalid resource. Rejecting request...');
});

// This will be the get response
app.get('/gets', function(req, res) {
  	var message = "";
  	message += 'Sucessfully made get request<br>';
  	
    if (countObjectProperties(req.query) == 0) {
      	message += "No request parameters specified...";
    } else {
      	message += '<br>' + 'Parameters (JSON format):<br>' + JSON.stringify(req.query);
    }
  
    res.send(message);
});

// This will be the put response
app.put('/puts', function(req, res) {
   	var message = "";
  	message += 'Sucessfully made put request<br>';
  	
    if (countObjectProperties(req.query) == 0) {
      	message += "No request parameters specified...";
    } else {
      	message += '<br>' + 'Parameters (JSON format):<br>' + JSON.stringify(req.query);
    }
  
    res.send(message);
});

// This will be the post response
app.post('/posts', function(req, res) {
  	var message = "";
  	message += 'Sucessfully made post request<br>';
  	
    if (countObjectProperties(req.query) == 0) {
      	message += "No request parameters specified...";
    } else {
      	message += '<br>' + 'Parameters (JSON format):<br>' + JSON.stringify(req.query);
    }
  
    res.send(message);
});

// This will be the delete response
app.delete('/deletes', function(req, res) {
  	var message = "";
  	message += 'Sucessfully made delete request<br>';
  
    if (countObjectProperties(req.query) == 0) {
      	message += "No request parameters specified...";
    } else {
      	message += '<br>' + 'Parameters (JSON format):<br>' + JSON.stringify(req.query);
    }
  
    res.send(message);
});

// Unsupported HTTP requests error
app.all('*', function(req, res) {
 	res.send('Unsupported HTTP request!'); 
});

// This was here by default
app.all('*', proxy.run);

app.listen(3000);
