import { FastifyInstance } from "fastify";
import * as UserRepo from "../repository/user.repository.js";
import * as bcrypt from "bcrypt";




/**
 * 로그인 (인증 및 토큰 발급)
 * @param app FastifyInstance
 * @param data id, password
 * @returns token ?? null
 */
export async function login(
    app: FastifyInstance,
    data: { id: string, password: string }
) {
    const user = await UserRepo.findUserByID(app, data.id);
    if (!user) return null;

    const result = await bcrypt.compare(data.password, user.password);
    if (!result) return null;

    return {
        accessToken: app.jwt.sign(
            {
                nickname: user.nickname
            },
            { expiresIn: "15m" }
        ),
        refreshToken: app.jwt.sign(
            {
                nickname: user.nickname
            },
            { expiresIn: "14d" }
        ),
        user: {
            nickname: user.nickname
        }
    }
}