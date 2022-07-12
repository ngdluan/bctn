"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.userSchemas = void 0;
const zod_1 = require("zod");
const fastify_zod_1 = require("fastify-zod");
const userCore = {
    email: zod_1.z.string({
        required_error: JSON.stringify({
            en: 'Email is required',
            vi: 'Email là bắt buộc'
        }),
        invalid_type_error: JSON.stringify({
            en: 'Email must be a string',
            vi: 'Email phải ở dạng chữ'
        })
    })
        .email(),
    name: zod_1.z.string()
};
const userCreateSchema = zod_1.z.object({
    ...userCore,
    password: zod_1.z.string({
        required_error: JSON.stringify({
            en: 'Password is required',
            vi: 'Bắt buộc phải nhập mật khẩu'
        }),
        invalid_type_error: JSON.stringify({
            en: 'Password must be a string',
            vi: 'Password phải là dạng text'
        })
    }),
}).passthrough();
const userCreateResponseSchema = zod_1.z.object({
    id: zod_1.z.number(),
    hash: zod_1.z.string(),
    ...userCore,
}).passthrough();
const userLoginSchema = zod_1.z.object({
    email: zod_1.z.string({
        required_error: JSON.stringify({
            en: 'Email is required',
            vi: 'Email là bắt buộc'
        })
    }).email(),
    password: zod_1.z.string(),
});
const userLoginResponseSchema = zod_1.z.object({
    accessToken: zod_1.z.string(),
    ...userCore,
});
_a = (0, fastify_zod_1.buildJsonSchemas)({
    userCreateSchema,
    userCreateResponseSchema,
    userLoginSchema,
    userLoginResponseSchema
}), exports.userSchemas = _a.schemas, exports.$ref = _a.$ref;
