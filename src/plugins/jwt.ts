import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import { FastifyInstance } from "fastify";




/**
 * JWT 설정
 */
export default fp(async (app: FastifyInstance) => {
    app.register(jwt, {
        secret: app.config.JWT_SECRET,
        cookie: {
            cookieName: "access_token",
            signed: false
        }
    });
});