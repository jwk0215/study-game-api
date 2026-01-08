import { FastifyInstance } from "fastify";
import { query, execute } from "../plugins/db";




/**
 * 닉네임으로 유저 찾기
 * @param app FastifyInstance
 * @param nickname 닉네임
 * @returns 유저정보 ?? null
 */
export async function findUserByNickname(
    app: FastifyInstance,
    nickname: string
) {
    try {
        const rows = await query<User>(
            app,
            `select * from user where nickname = ?`,
            [ nickname ]
        );
    
        return rows[0] ?? null;
        
    } catch (error: any) {
        console.error(error);
        return null;
    }
}


/**
 * 아이디로 유저 찾기
 * @param app FastifyInstance
 * @param id 아이디
 * @returns 유저정보 ?? null
 */
export async function findUserByID(
    app: FastifyInstance,
    id: string
) {
    try {
        const rows = await query<User>(
            app,
            `select * from user where id = ?`,
            [ id ]
        );
    
        return rows[0] ?? null;
        
    } catch (error: any) {
        console.error(error);
        return null;
    }
}


/**
 * 회원가입
 * @param app FastifyInstance
 * @param data 회원가입 데이터
 * @returns boolean
 */
export async function join(
    app: FastifyInstance,
    data: User
) {
    try {
        const result = await execute(
            app,
            `
                insert into user
                (id, password, nickname, reg_dt)
                values
                (?, ?, ?, now())
            `,
            [
                data.id,
                data.password,
                data.nickname
            ]
        );
    
        return result.affectedRows === 1;
        
    } catch (error: any) {
        console.error(error);
        return false;
    }
}



export async function regCType(
    app: FastifyInstance,
    data: User
) {
    try {
        const result = await execute(
            app,
            `
                update user set
                c_type = ?
                where id = ?
            `,
            [
                data.c_type,
                data.id
            ]
        );

        return result.affectedRows === 1;

    } catch (error: any) {
        console.error(error);
        return false;
    }
}