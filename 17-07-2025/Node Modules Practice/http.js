import http from "http";

const PORT = 3000;

const server = http.createServer((req, res) => {
  //res.writeHead(200, { "Content-Type": "text/plain" });

  //res.end("Hello, Woasdrld!\n");

  console.log("Request Headers:", req.headers);

  const userAgent = req.headers["user-agent"];
  const acceptLanguage = req.headers["accept-language"];

  res.writeHead(200, { "Content-Type": "text/plain" });
  //res.end(`User-Agent: ${userAgent}\nAccept-Language: ${acceptLanguage}`);

  const { url, method } = req;

  res.end(`You made a ${method} request to ${url}`);
});

server.listen(PORT, "localhost", () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
