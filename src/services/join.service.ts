import { FastifyInstance } from "fastify";
import bcrypt from "bcrypt";
import * as UserRepo from "../repository/user.repository.js";




/**
 * 닉네임 사용가능여부 확인
 * @param app FastifyInstance
 * @param nickname string(닉네임)
 */
export async function checkNicknameAvailable(
    app: FastifyInstance,
    nickname: string
) {
    const user = await UserRepo.findUserByNickname(app, nickname);
    return !user;
}


/**
 * 아이디 사용가능여부 확인
 * @param app FastifyInstance
 * @param id string(아이디)
 */
export async function checkIdAvailable(
    app: FastifyInstance,
    id: string
) {
    const user = await UserRepo.findUserByID(app, id);
    return !user;
}


/**
 * 회원가입
 * @param app FastifyInstance
 * @param data User
 */
export async function join(
    app: FastifyInstance,
    data: UserRepo.User
) {
    const hash = await bcrypt.hash(data.password, 12);
    data.password = hash;
    
    return await UserRepo.join(app, data);
}