"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("./user.service"));
const user_schema_1 = require("./user.schema");
async function userRouter(app) {
    const tags = ['User'];
    app.post('/', {
        schema: {
            tags,
            body: (0, user_schema_1.$ref)('userCreateSchema'),
            response: {
                201: (0, user_schema_1.$ref)('userCreateResponseSchema')
            }
        }
    }, user_service_1.default.register);
    app.post('/login', {
        schema: {
            tags,
            body: (0, user_schema_1.$ref)('userLoginSchema'),
            response: {
                200: (0, user_schema_1.$ref)('userLoginResponseSchema'),
            }
        }
    }, user_service_1.default.login);
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
    }, user_service_1.default.get);
}
exports.default = userRouter;
