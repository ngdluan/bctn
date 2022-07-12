"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const prisma_1 = __importDefault(require("./plugins/prisma"));
// import swagger from 'fastify-swagger'
const jwt_1 = __importDefault(require("@fastify/jwt"));
const user_schema_1 = require("./api/user/user.schema");
const user_1 = __importDefault(require("./api/user/user"));
const fastify_zod_1 = require("fastify-zod");
const swagger_1 = __importDefault(require("@fastify/swagger"));
function start() {
    const app = (0, fastify_1.default)();
    app.register(jwt_1.default, {
        secret: process.env.JSON || 'thisIsTopSecret'
    });
    app.decorate('authen', async (req, res) => {
        try {
            await req.jwtVerify();
        }
        catch (e) {
            return res.send(e);
        }
    });
    app.register(prisma_1.default);
    app.get('/helthcheck', async function () {
        return { status: 'OK' };
    });
    app.get('/', async (req, res) => {
        return 'hello word';
    });
    for (const schema of [...user_schema_1.userSchemas]) {
        app.addSchema(schema);
    }
    app.register(swagger_1.default, (0, fastify_zod_1.withRefResolver)({
        routePrefix: '/webapi/swagger',
        exposeRoute: true,
        staticCSP: true,
        openapi: {
            info: {
                title: 'Luan App',
                description: 'Api for best app ever',
                version: '0.0.1'
            },
            tags: [
                { name: 'User', description: 'User related end-point' },
            ],
        }
    }));
    app.register(user_1.default, { prefix: '/api/user' });
    return app;
}
let app = start();
app.listen({ port: 3006 }, (err, address) => {
    if (err) {
        console.log(err);
    }
    console.log(`server listening at ${address}`);
});
