import { FastifyInstance } from "fastify";




export default async function logoutRoute(app: FastifyInstance) {
    app.post('/', async (req, reply) => {
        return reply
        .clearCookie("access_token", { path: '/' })
        .clearCookie("refresh_token", { path: '/' })
        .send({ success: true });
    });
}
