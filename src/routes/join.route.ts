import { FastifyInstance } from "fastify";
import * as UserService from "../services/join.service.js";




export default async function joinRoutes(app: FastifyInstance) {
    /**
     * 닉네임 사용가능 여부
     * "/ch-nick"
     */
    app.post("/ch-nick", async (req, reply) => {
        const { value } = req.body as { value: string };
        if (!value) reply.code(400).send({ message: "입력 값이 없습니다." });
        
        const available = await UserService.checkNicknameAvailable(app, value);
        return reply.code(200).send({
            success: true,
            data: {
                value,
                available
            }
        });
    });

    /**
     * 아이디 사용가능 여부
     * "/ch-id"
     */
    app.post("/ch-id", async (req, reply) => {
        const { value } = req.body as { value: string }
        if (!value) reply.code(400).send({ message: "입력 값이 없습니다." });

        const available = await UserService.checkIdAvailable(app, value);
        return reply.code(200).send({
            success: true,
            data: {
                value,
                available
            }
        });
    });

    /**
     * 회원가입
     * '/'
     */
    app.post("/", async (req, reply) => {
        const { id } = req.body as { id: string };
        const { pw } = req.body as { pw: string };
        const { nickname } = req.body as { nickname: string };

        if (!id || !pw || !nickname) return reply.code(400).send({ message: "필수 입력 값이 누락되었습니다." });

        const result = await UserService.join(
            app,
            {
                id,
                password: pw,
                nickname
            }
        );

        if (!result) return reply.code(500).send({ message: "회원가입 실패" });
        
        return reply.code(201).send({
            success: true,
            data: {
                result
            }
        });
    });
}