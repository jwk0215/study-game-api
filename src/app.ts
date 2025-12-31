import fastify from "fastify";
import fastifyEnv from "@fastify/env";
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