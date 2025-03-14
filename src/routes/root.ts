import type { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify, _): Promise<void> => {
	fastify.get("/health", async (_, reply) => {
		return reply.send({ status: "ok" });
	});
};

export default root;
