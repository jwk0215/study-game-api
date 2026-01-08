import "fastify";
import { Pool } from "mysql2/promise";




declare module "fastify" {
    interface FastifyInstance {
        config: {
            DB_HOST: string;
            DB_PORT: number;
            DB_USER: string;
            DB_PASS: string;
            DB_NAME: string;
            JWT_SECRET: string;
        }

        db: Pool;

        authenticate: (
            request: FastifyRequest,
            reply: FastifyReply
        ) => Promise<void>;
    }

    interface FastifyRequest {
        user: User;
    }
}


declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: User;
        user: User;
    }
}