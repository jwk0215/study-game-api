export const envSchema = {
    type: "object",
    required: [
        "DB_HOST",
        "DB_PORT",
        "DB_USER",
        "DB_PASS",
        "DB_NAME",
        "JWT_SECRET"
    ],
    properties: {
        DB_HOST: { type: "string" },
        DB_PORT: { type: "number" },
        DB_USER: { type: "string" },
        DB_PASS: { type: "string" },
        DB_NAME: { type: "string" },
        JWT_SECRET: { type: "string" },
    }
}