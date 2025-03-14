import config from "@/config";
import { Logger } from "@jubelio/service-base";
import type { FastifyRequest, HookHandlerDoneFunction } from "fastify";
import fp from "fastify-plugin";

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type SupportPluginOptions = {};

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<SupportPluginOptions>(async (fastify, _) => {
	const logger = Logger.createLogger(
		config.SERVICE_NAME,
		config.ES_LOG_ID,
		config.ES_API_KEY,
		config.ES_NODENAME,
		Boolean(config.ES_USE_PASSWORD),
		config.ENABLE_LOG,
		config.ES_LOG_LEVEL,
	);
	fastify.addHook("onRequest", (req: FastifyRequest, _, done: HookHandlerDoneFunction) => {
		req.logger = logger;
		done();
	});
});

// When using .decorate you have to specify added properties for Typescript
declare module "fastify" {
	export interface FastifyRequest {
		logger: Logger;
	}
}
