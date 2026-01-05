import fp from "fastify-plugin";
import { 
    FastifyInstance,
    FastifyRequest,
    FastifyReply
} from "fastify";




/**
 * 로그인 인증
 */
export default fp(async (app: FastifyInstance) => {
    app.decorate(
        "authenticate",
        async (
            request: FastifyRequest,
            reply: FastifyReply
        ) => {
            try {
                await request.jwtVerify({ onlyCookie: true });
            } catch (error) {
                return reply.code(401).send({ message: "로그인이 필요합니다." });
            }
        }
    )
});