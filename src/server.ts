import { buildApp } from "./app.js";



const start = async () => {
    const app = await buildApp();
    app.listen({
        host: "0.0.0.0",
        port: 8098
    });
}


start();