import { FastifyInstance } from "fastify";
import joinRoutes from "./join.route.js";
import loginRoutes from "./login.route.js";
import logoutRoutes from "./logout.route.js";
import userRoutes from "./user.route.js";




export default async function routes(app: FastifyInstance) {
    app.register(joinRoutes, { prefix: "/join" });
    app.register(loginRoutes, { prefix: "/login" });
    app.register(logoutRoutes, { prefix: "/logout" });
    app.register(userRoutes, { prefix: "/user" });
}