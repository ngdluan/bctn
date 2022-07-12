import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import prismaPlugin from './plugins/prisma'
// import swagger from 'fastify-swagger'
import fjwt, { JWT } from '@fastify/jwt'

import { userSchemas } from './api/user/user.schema'

import userRouter from './api/user/user'
import { withRefResolver } from 'fastify-zod'
import swagger from '@fastify/swagger'

declare module 'fastify' {
    interface FastifyRequest {
        jwt: JWT;
    }
    export interface FastifyInstance {
        authen: any;
    }
}

function start() {
    const app = Fastify()

    app.register(fjwt, {
        secret: process.env.JSON || 'thisIsTopSecret'
    })

    app.decorate('authen', async (req: FastifyRequest, res: FastifyReply) => {
        try {
            await req.jwtVerify();
        } catch (e) {
            return res.send(e)
        }
    })

    app.register(prismaPlugin)

    app.get('/helthcheck', async function () {
        return { status: 'OK' }
    })
    app.get('/', async (req, res) => {
        return 'hello word'
    })

    for (const schema of [...userSchemas]) {
        app.addSchema(schema)
    }

    app.register(
        swagger,
        withRefResolver({
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
        })
    )

    app.register(userRouter, { prefix: '/api/user' })

    return app;
}


let app = start();

app.listen({ port: 3006 }, (err, address) => {
    if (err) {
        console.log(err);
    }
    console.log(`server listening at ${address}`)
})
