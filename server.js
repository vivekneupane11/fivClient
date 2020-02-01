const http = require("http");
const app = require("./app");

const port = process.env.PORT || process.env.PROJECT_PORT;

const server = http.createServer(app);

server.listen(port, () => {
  console.log("up and running " + port);
});
