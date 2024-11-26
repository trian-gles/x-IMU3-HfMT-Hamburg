const net = require("net");
const maxAPI = require("max-api");

const clients = new Set();

maxAPI.addHandler("bang", () => {
  clients.forEach((c) => {
    c.write("hello from the server!");
  });
});

maxAPI.addHandler("data", (...data) => {
  clients.forEach((c) => {
    c.write(data.join());
  });
});

const tcpServer = net.createServer(
  (socket) => {
      clients.add(socket);
      console.log('a client connected');

      socket.on("data", (clientData) => {
          console.log(`client sent ${clientData}`)
      })

      socket.on('end', () => {
          console.log('Client disconnected');
          clients.delete(socket);
      });
  }
)

tcpServer.listen(3000);