const url = require('url');
const http = require('http');
const fs = require('fs');
  

http.createServer((request, response) => {
  var addr = request.url,
    queryValue = url.parse(addr, true),
    filePath = '';

  if (queryValue.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html');
  } else {
    filePath = 'index.html';
  }

  fs.readFile(filePath, function(err, data) {
    if (err) {
      throw err;
    }

    fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', function(err) {
        if (err) {
          console.log(err);
        }
          else {
        console.log('Added to log.');
        }
      });

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();

  });
 
  

}).listen(8080, console.log('listening on port 8080'));

