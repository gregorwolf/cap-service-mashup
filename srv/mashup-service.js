const cds = require("@sap/cds");
const LOG = cds.log("mashup-service");

module.exports = cds.service.impl(async (srv) => {
  const bpService = await cds.connect.to("API_BUSINESS_PARTNER");

  srv.on("READ", "BusinessPartners", (req) => {
    LOG.info("READ BusinessPartners");
    return bpService.run(req.query);
  });

  srv.on("Hello", (req) => `Hello ${req.data.name}!`);
});
