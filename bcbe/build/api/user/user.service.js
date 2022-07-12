"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../plugins/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserHandler {
    constructor() { }
    async register(req, res) {
        const { password, ...body } = req.body;
        try {
            const hash = await bcrypt_1.default.hash(password, 6);
            const user = await prisma_1.prisma.user.create({
                data: { ...body, hash },
            });
            res.code(201).send({ ...user, hash: null });
        }
        catch (e) {
            return res.code(500).send(e);
        }
    }
    login(req, res) {
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
