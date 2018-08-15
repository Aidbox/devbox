const axios = require("axios");

const AIDBOX_URL = process.env.AIDBOX_URL;

if (!AIDBOX_URL || AIDBOX_URL === "") {
  console.log("No AIDBOX_URL environment variable is defined. Exiting.");
  process.exit(1);
}

module.exports.getAuthConsole = () => {
  return secrets.get("aidbox").console;
};

module.exports.request = opts => {
  const options = Object.assign({}, opts);
  options.url = `${AIDBOX_URL}${opts.url}`;

  return axios(options);
};

module.exports.create = (resource, opts) => {
  return this.request(
    Object.assign(
      {
        method: "post",
        url: `/fhir/${resource.resourceType}`,
        data: resource
      },
      opts
    )
  );
};

module.exports.update = (resource, opts) => {
  return this.request(
    Object.assign(
      {
        method: "put",
        url: `/fhir/${resource.resourceType}/${resource.id}`,
        data: resource
      },
      opts
    )
  );
};

module.exports.read = (resourceType, id, opts) => {
  return this.request(
    Object.assign(
      {
        method: "get",
        url: `/fhir/${resourceType}/${id}`
      },
      opts
    )
  );
};

module.exports.refread = (ref, opts) => {
  return this.request(
    Object.assign(
      {
        method: "get",
        url: `/fhir/${ref}`
      },
      opts
    )
  );
};

module.exports.all = (resourceType, opts) => {
  return this.request(
    Object.assign(
      {
        method: "get",
        params: { _count: OVER9000 },
        url: `/fhir/${resourceType}`
      },
      opts
    )
  );
};

module.exports.search = (resourceType, params, opts) => {
  return this.request(
    Object.assign(
      {
        method: "get",
        url: `/fhir/${resourceType}${toQueryString(params)}`
      },
      opts
    )
  );
};

module.exports.transaction = (bundle, opts) => {
  return this.request(
    Object.assign(
      {
        method: "post",
        url: "/fhir/",
        data: bundle
      },
      opts
    )
  );
};

module.exports.refdelete = (ref, opts) => {
  return this.request(
    Object.assign(
      {
        method: "delete",
        url: `/fhir/${ref}`
      },
      opts
    )
  );
};

module.exports.delete = (resourceType, resourceOrId, opts) => {
  const id = resourceOrId.id || resourceOrId;
  return this.request(
    Object.assign(
      {
        method: "delete",
        url: `/fhir/${resourceType}/${id}`
      },
      opts
    )
  );
};

module.exports.proxyResponse = res => {
  return resp => {
    res.status(resp.status || 500);

    Object.keys(resp.headers).forEach(hdr => {
      res.header(hdr, resp.headers[hdr]);
    });

    res.send(resp.data);
    return Promise.resolve(true);
  };
};

module.exports.proxyError = res => {
  return e => {
    if (e.response) {
      res.status((e.response && e.response.status) || 500);
      res.header("content-type", e.response.headers["content-type"]);
      res.send(e.response.data);
    } else {
      res.status(500);
      res.send(e.toString()).end();
      throw e;
    }
  };
};
