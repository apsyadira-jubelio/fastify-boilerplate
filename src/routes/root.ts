import type { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify, _): Promise<void> => {
	fastify.get("/healt", async (_, reply) => {
		return reply.send("service is running");
	});
};

export default root;
