"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../plugins/prisma");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const const_1 = require("../../base/const");
class UserHandler {
    constructor() { }
    async register(req, res) {
        const { password, ...body } = req.body;
        try {
            const _hash = await bcrypt_1.default.hash(password, 6);
            const user = await prisma_1.prisma.user.create({
                data: { ...body, hash: _hash },
            });
            const { hash, status, verify, code, wrong, forget, ...userRes } = user;
            res.code(201).send(userRes);
        }
        catch (e) {
            return res.code(500).send(e);
        }
    }
    async login(req, res) {
        const { email, tel, userName, password } = req.body;
        let user, where = {};
        const select = { hash: true, id: true, email: true, role: true, };
        if (email)
            where = { email };
        if (tel)
            where = { tel };
        if (userName)
            where = { userName };
        try {
            user = await prisma_1.prisma.user.findUniqueOrThrow({ where, select });
            const verify = await bcrypt_1.default.compare(password, user.hash);
            if (!verify)
                return new Error('Wrong password');
            const token = await jsonwebtoken_1.default.sign({ id: user.id, }, process.env.JSON || const_1.JSON, { expiresIn: '4h' });
            const refreshToken = await jsonwebtoken_1.default.sign({}, process.env.JSON || const_1.JSON);
        }
        catch (e) {
            return res.code(500).send(e);
        }
    }
    get() {
        prisma_1.prisma.user.findMany({
            select: {
                email: true,
                name: true,
                id: true,
            }
        });
    }
}
const userHandler = new UserHandler();
exports.default = userHandler;
