const aidbox = require("./lib/aidbox");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const randomString = () => {
  let text = "";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    text += chars.charAt(Math.floor(Math.random() * chars.length));

  return text;
};

// Generic Hello World handler
app.get("/", (req, res) =>
  res.send("Welcome to FHIR world, please follow me!")
);

// Endpoint to create new Patient resource.
// You can apply some custom business logic here.
app.post("/new-patient", (req, res) => {
  const resource = {
    resourceType: "Patient",
    name: [
      {
        given: [randomString()],
        family: randomString()
      }
    ]
  };

  return aidbox
    .create(resource)
    .then(aidbox.proxyResponse(res))
    .catch(aidbox.proxyError(res));
});

// Proxying endpoint example. All requests to this endpoint
// will be proxied as is to the aidbox instance. You can put here
// as many checks and business logic as you need.

// There is one example check here. If request's body contains word "Voldemort",
// microservice will respond with "400 Bad request".
app.all(/^\/fhir-proxy\/.*$/, (req, res) => {
  const opts = {
    method: req.method,
    url: req.url.replace(/^\/fhir-proxy\//, "/fhir/")
  };

  if (req.method !== "GET") {
    opts.data = req.body;

    if (JSON.stringify(req.body).match(/voldemort/i)) {
      res.status(400).send({ message: "Voldemort shall not pass!" });
    }
  }

  return aidbox
    .request(opts)
    .then(aidbox.proxyResponse(res))
    .catch(aidbox.proxyError(res));
});

app.listen(3000, () =>
  console.log("Aidbox Microservice Example is listening on port 3000!")
);
