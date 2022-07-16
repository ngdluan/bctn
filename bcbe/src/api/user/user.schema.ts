import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const userCore = {
    email: z.string({
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
    name: z.string()
};

const userCreateSchema = z.object({
    ...userCore,
    password: z.string({
        required_error: JSON.stringify({
            en: 'Password is required',
            vi: 'Bắt buộc phải nhập mật khẩu'
        }),
        invalid_type_error: JSON.stringify({
            en: 'Password must be a string',
            vi: 'Password phải là dạng text'
        })
    }),

}).passthrough()

const userCreateResponseSchema = z.object({
    id: z.number(),
    ...userCore,
}).passthrough()

const userLoginSchema = z.object({
    email: z.string().email().optional(),
    tel: z.string().optional(),
    userName: z.string().optional(),
    password: z.string(),
})

const userLoginResponseSchema = z.object({
    accessToken: z.string(),
    ...userCore,
})

export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserLoginInput = z.infer<typeof userLoginSchema>;
export const { schemas: userSchemas, $ref } = buildJsonSchemas({
    userCreateSchema,
    userCreateResponseSchema,
    userLoginSchema,
    userLoginResponseSchema
});