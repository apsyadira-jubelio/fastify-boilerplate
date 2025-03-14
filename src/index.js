import config from "@/config";
import fastify from "fastify";
import { app } from "./app";
import "dotenv/config";

import "@/lib/apm";

const host = config.SERVER_HOST;
const port = config.SERVER_PORT ? Number(config.SERVER_PORT) : 8000;

let isShuttingDown = false;

const server = fastify({
	logger: true,
});

server.register(app);

server.listen({ port, host }, (err) => {
	if (err) {
		server.log.error(err);
		process.exit(1);
	} else {
		console.log(`[ready] http://${host}:${port}`);
	}
});

const gracefulShutdown = async (signal) => {
	if (isShuttingDown) {
		return;
	}
	isShuttingDown = true;
	console.log(`${signal} received. Gracefully shutting down.`);

	// Wait 30 seconds for existing connections to finish
	const timeout = setTimeout(() => {
		console.warn("Forcefully shutting down after 20 seconds.");
		process.exit(1); // Exit with a non-zero code to indicate an issue on shutdown
	}, 10000);

	timeout.unref();

	// Stop accepting new connections
	await server.close();

	console.log("Closed out remaining connections.");
	clearTimeout(timeout);

	process.exit(0);
};

if (process.env.NODE_ENV === "production") {
	process.on("SIGINT", gracefulShutdown);
	process.on("SIGTERM", gracefulShutdown);
}
