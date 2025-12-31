import { FastifyInstance } from "fastify";
import * as LoginService from "../services/login.service.js";




export default async function loginRoutes(app: FastifyInstance) {
    /**
     * login
     * '/'
     */
    app.post('/', async (req, reply) => {
        const { id } = req.body as { id: string };
        const { pw: password } = req.body as { pw: string };

        if (!id || !password) return reply.code(400).send({ message: "필수 입력 값이 누락되었습니다." });

        const result = await LoginService.login(app, { id, password });
        
    });
}