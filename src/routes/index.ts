import { FastifyInstance } from "fastify";
import joinRoutes from "./join.route.js";
import loginRoutes from "./login.route.js";




export default async function routes(app: FastifyInstance) {
    app.register(joinRoutes, { prefix: "/join" });
    app.register(loginRoutes, { prefix: "/login" });
}