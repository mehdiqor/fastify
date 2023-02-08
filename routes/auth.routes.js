import { registerHandler } from "../handler/auth.handler.js";

const registerRoute = {
    schema : {
        tags : ['authentication'],
        body : {
            type : 'object',
            properties : {
                username : {type : 'string'},
                password : {type : 'string'},
                first_name : {type : 'string'},
                last_name : {type : 'string'},
            }
        },
        response : {
            201 : {
                type : 'object',
                properties : {
                    username : {type : 'string'},
                    password : {type : 'string'},
                    first_name : {type : 'string'},
                    last_name : {type : 'string'},
                }
            }
        }
    },
    handler : registerHandler
}
export default function authRoutes(fastify, option, done){
    fastify.post("/register", registerRoute)
    done()
}