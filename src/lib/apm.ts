import apm from "elastic-apm-node";

apm.start({
	serviceName: "service-contact-sync-contact",
	secretToken: process.env.ELASTIC_APM_SECRET_TOKEN,
	serverUrl: process.env.ELASTIC_APM_SERVER_URL || "http://localhost:8200",
	environment: process.env.ELASTIC_APM_ENVIRONMENT || "development",
});

export default apm;
