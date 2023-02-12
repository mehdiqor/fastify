import { changeProfileHandler, getProfileHandler } from "../handler/user.handler.js";
import { getUserMiddleware } from "../utils/get-user.js";

const UserDetail = {
    type : 'object',
    properties : {
        id : {type : "number"},
        address : {type : "string"},
        latitudes : {type : "string"},
        longitudes : {type : "string"}
    }
}
const changeProfileRoute = {
    schema : {
        tags : ['user'],
        security : [{apiKey : []}],
        body : {
            type : 'object',
            properties : {
                address : {
                    type : 'string'
                },
                latitudes : {
                    type : 'number'
                },
                longitudes : {
                    type : 'number'
                }
            }
        },
        response : {
            201 : {
                type : "object"
            }
        }
    },
    handler : changeProfileHandler,
    preHandler : [getUserMiddleware]
}
const getProfileRoute = {
    schema : {
        tags : ['user'],
        security : [{apiKey : []}],
        response : {
            200 : {
                type : 'object',
                properties : {
                    user : {
                        type : "object",
                        properties : {
                            id : {type : "number"},
                            first_name : {type : "string"},
                            last_name : {type : "string"},
                            username : {type : "string"},
                            accessToken : {type : "string"},
                            UserDetail : UserDetail,
                        }
                    }
                }
            }
        }
    },
    handler : getProfileHandler,
    preHandler : [getUserMiddleware]
}

export default function userRoutes(fastify, options, done){
    fastify.patch("/change", changeProfileRoute);
    fastify.get("/get", getProfileRoute);
    done();
}