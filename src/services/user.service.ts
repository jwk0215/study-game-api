import { FastifyInstance } from "fastify";
import * as UserRepo from "../repository/user.repository.js";




export async function regCType(
    app: FastifyInstance,
    data: User
) {
    await UserRepo.regCType(app, data);
    const user = await UserRepo.findUserByID(app, data.id);

    return {
        accessToken: app.jwt.sign(
            {
                id: user.id,
                nickname: user.nickname,
                gem: user.gem,
                c_type: user.c_type,
                reg_data: user.reg_data
            },
            { expiresIn: "15m" }
        ),
        refreshToken: app.jwt.sign(
            {
                id: user.id,
                nickname: user.nickname,
                gem: user.gem,
                c_type: user.c_type,
                reg_data: user.reg_data
            },
            { expiresIn: "14d" }
        )
    }
}