import { FastifyInstance } from 'fastify'
import userHandler from './user.service'
import { $ref } from './user.schema'


export default async function userRouter(app: FastifyInstance) {
    const tags = ['User'];
    app.post('/', {
        schema: {
            tags,
            body: $ref('userCreateSchema'),
            response: {
                201: $ref('userCreateResponseSchema')
            }
        }
    }, userHandler.register)

    app.post('/login', {
        schema: {
            tags,
            body: $ref('userLoginSchema'),
            response: {
                200: $ref('userLoginResponseSchema'),
            }
        }
    }, userHandler.login)

    app.get('/', {
        preHandler: [app.authen],
        schema: {
            tags,
            response: {
                401: {
                    type: 'object',
                    properties: {
                        "statusCode": { type: 'number' },
                        "error": { type: 'string' },
                        "message": { type: 'string' }
                    }
                }
            }
        },
    }, userHandler.get)
}