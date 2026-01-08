import { FastifyInstance } from "fastify";
import * as UserService from "../services/user.service.js";




export default async function userRoutes(app: FastifyInstance) {
    /**
     * 캐릭터 선택
     * POST
     * "/r-c-gender"
     */
    app.post(
        "/r-c-type",
        { preHandler: [app.authenticate] },
        async (req, reply) => {
        const { c_type } = req.body as { c_type: string };
        if (!c_type) return reply.code(400).send({ message: "값이 누락되었습니다." });

        const result = await UserService.regCType(app, { c_type, id: req.user.id });
        if (!result) return reply.code(500).send({ message: "캐릭터 등록 실패" });

        const F_MIN = 1000 * 60 * 15;
        const T_WEEK = 1000 * 60 * 60 * 24 * 14;
        
        return reply
        .setCookie("access_token", result.accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/',
            maxAge: F_MIN / 1000,
            expires: new Date(Date.now() + F_MIN)
        })
        .setCookie("refresh_token", result.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/',
            maxAge: T_WEEK / 1000,
            expires: new Date(Date.now() + T_WEEK)
        })
        .send({
            success: true,
            data: {
                c_type
            }
        });
    });
}
