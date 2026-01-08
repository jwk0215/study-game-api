import { FastifyInstance } from "fastify";
import * as LoginService from "../services/login.service.js";




export default async function loginRoutes(app: FastifyInstance) {
    /**
     * login
     * "POST"
     * '/'
     */
    app.post('/', async (req, reply) => {
        const { id } = req.body as { id: string };
        const { pw: password } = req.body as { pw: string };
        if (!id || !password) return reply.code(400).send({ message: "필수 입력 값이 누락되었습니다." });

        const result = await LoginService.login(app, { id, password });
        if (!result) return reply.code(400).send({ message: "확인 후 다시 시도해주세요." });

        const F_MIN = 1000 * 60 * 15;
        const T_WEEK = 1000 * 60 * 60 * 24 * 14;
        
        return reply.code(200)
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
                user: result.user
            }
        });
    });


    /**
     * login check
     * "GET"
     * "/check"
     */
    app.get("/check", { preHandler: [app.authenticate] }, async (req, reply) => {
        return reply.code(200).send({
            success: true,
            data: {
                user: req.user
            }
        })
    });


    /**
     * login refresh
     * "POST"
     * "/refresh"
     */
    app.post("/refresh", async (req, reply) => {
        try {
            const refreshToken = req.cookies.refresh_token;
            
            const payload = app.jwt.verify<User>(refreshToken);

            const accessToken = app.jwt.sign(
                {
                    id: payload.id,
                    nickname: payload.nickname,
                    gem: payload.gem,
                    c_type: payload.c_type,
                    reg_data: payload.reg_data
                },
                { expiresIn: "15m" }
            );

            return reply.setCookie("access_token", accessToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 15
            })
            .send({
                success: true,
                data: {
                    user: payload
                }
            });

        } catch(error) {
            console.log(error);

            return reply.code(401)
            .clearCookie("access_token", { path: '/' })
            .clearCookie("refresh_token", { path: '/' })
            .send({ message: "로그인이 필요합니다." });
        }
    });
}