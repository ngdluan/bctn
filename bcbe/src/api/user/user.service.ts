import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../../plugins/prisma'
import { UserCreateInput } from './user.schema';

import bcrypt from 'bcrypt';

class UserHandler {
    constructor() { }
    public async register(req: FastifyRequest<{ Body: UserCreateInput }>, res: FastifyReply) {
        const { password, ...body } = req.body
        try {
            const hash = await bcrypt.hash(password, 6)
            const user = await prisma.user.create({
                data: { ...body, hash },
            })
            res.code(201).send({ ...user, hash: null })
        } catch (e) {
            return res.code(500).send(e)
        }
    }

    public login(req: FastifyRequest, res: FastifyReply) {

    }

    public get() {
        prisma.user.findMany({
            select: {
                email: true,
                name: true,
                id: true,
            }
        })
    }
}

const userHandler = new UserHandler()

export default userHandler;