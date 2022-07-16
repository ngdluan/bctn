import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../../plugins/prisma'
import { UserCreateInput, UserLoginInput } from './user.schema';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JSON } from '../../base/const'

class UserHandler {
    constructor() { }
    public async register(req: FastifyRequest<{ Body: UserCreateInput }>, res: FastifyReply) {
        const { password, ...body } = req.body
        try {
            const _hash = await bcrypt.hash(password, 6)
            const user = await prisma.user.create({
                data: { ...body, hash: _hash },
            })
            const { hash, status, verify, code, wrong, forget, ...userRes } = user
            res.code(201).send(userRes)
        } catch (e) {
            return res.code(500).send(e)
        }
    }

    public async login(req: FastifyRequest<{ Body: UserLoginInput }>, res: FastifyReply) {

        const { email, tel, userName, password } = req.body;
        let user, where = {}
        const select = { hash: true, id: true, email: true, role: true, }
        if (email) where = { email }
        if (tel) where = { tel }
        if (userName) where = { userName }
        try {
            user = await prisma.user.findUniqueOrThrow({ where, select });
            const verify = await bcrypt.compare(password, user.hash)
            if (!verify) return new Error('Wrong password');
            const token = await jwt.sign({ id: user.id, }, process.env.JSON || JSON, { expiresIn: '4h' })
            const refreshToken = await jwt.sign({}, process.env.JSON || JSON)

        } catch (e) {
            return res.code(500).send(e)
        }

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