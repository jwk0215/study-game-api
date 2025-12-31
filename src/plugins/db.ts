import { FastifyInstance } from "fastify";
import { PoolConnection, ResultSetHeader } from "mysql2/promise";
import mysql from "mysql2/promise";




/**
 * DB setup
 * @param app FastifyInstance
 */
export async function registerDB(app: FastifyInstance) {
    const pool = mysql.createPool({
        host: app.config.DB_HOST,
        port: app.config.DB_PORT,
        user: app.config.DB_USER,
        password: app.config.DB_PASS,
        database: app.config.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        charset: "utf8mb4"
    });

    app.decorate("db", pool);
    app.addHook("onClose", () => pool.end());
}


/**
 * DB Query 실행 함수 (select 전용)
 * @param app FastifyInstance
 * @param sql 쿼리문
 * @param params params
 * @returns result[]
 */
export async function query<T = any>(
    app: FastifyInstance,
    sql: string,
    params?: any[]
): Promise<T[]> {
    const [ rows ] = await app.db.execute(sql, params);
    return rows as T[];
}


/**
 * DB Query 실행 함수 (insert, update, delete 전용)
 * @param app FastifyInstance
 * @param sql 쿼리문
 * @param params params
 * @returns ResultSetHeader
 */
export async function execute(
    app: FastifyInstance,
    sql: string,
    params?: any[]
): Promise<ResultSetHeader> {
    const [ result ] = await app.db.execute<ResultSetHeader>(sql, params);
    return result;
}


/**
 * DB Transaction 실행 함수
 * @param app FastifyInstance
 * @param fn callback
 * @returns result
 */
export async function transaction<T>(
    app: FastifyInstance,
    fn: (conn: PoolConnection) => Promise<T>
): Promise<T> {
    const conn = await app.db.getConnection();

    try {
        await conn.beginTransaction();
        const result = await fn(conn);
        await conn.commit();
        return result;

    } catch (error: any) {
        await conn.rollback();
        throw error;

    } finally {
        conn.release();
    }
}