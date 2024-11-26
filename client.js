const net = require("net");
const maxAPI = require("max-api");

maxAPI.addHandler("connect", (ip) => {
  var client = new net.Socket();
  client.connect(3000, ip, function() {
    console.log('Connected');
    client.write('Hello, server! Love, Client.');
  });

  client.on('data', function(data) {
    maxAPI.outlet(data.toString().split(',').map(parseFloat));
  });

  client.on('close', function() {
    console.log('Connection closed');
  });
});

