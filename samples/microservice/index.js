const aidbox = require("./lib/aidbox");
const express = require("express");
const app = express();

// Generic Express handler
app.get("/", (req, res) =>
  res.send("Welcome to FHIR world, please follow me!")
);

// Proxying endpoint with additional access check
app.all("/fhir-proxy/*", (req, res) => {
  const opts = {
    method: req.method,
    url: req.url.replace(/^\/fhir-proxy\//, "/fhir/")
  };

  if (req.method !== "GET") {
    opts.data = req.body;
  }

  return aidbox
    .request(opts)
    .then(aidbox.proxyResponse(res))
    .catch(aidbox.proxyError(res));
});

app.listen(3000, () =>
  console.log("Aidbox Microservice Example is listening on port 3000!")
);
