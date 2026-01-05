import fastify from "fastify";
import fastifyEnv from "@fastify/env";
import cookie from "@fastify/cookie";
import jwtPlugin from "./plugins/jwt.js";
import authPlugin from "./plugins/auth.js";
import cors from "@fastify/cors";
import routes from "./routes/index.js";
import { envSchema } from "./env.js";
import { registerDB } from "./plugins/db.js";




export async function buildApp() {
    const app = fastify({ logger: true });
    
    await app.register(fastifyEnv, {
        schema: envSchema,
        dotenv: {
            path: `.env.${process.env.NODE_ENV}`
        }
    });

    await app.register(cookie);
    await app.register(jwtPlugin);
    await app.register(authPlugin);

    app.register(cors, {
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
        ],
        credentials: true
    });
    app.register(routes);
    
    await registerDB(app);

    return app;
}