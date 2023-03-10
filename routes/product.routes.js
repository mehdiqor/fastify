import { getAllProducts, getOneProduct } from "../handler/product.handler.js";
import { getUserMiddleware } from "../utils/get-user.js";

const product = {
    type : 'object',
    properties : {
        id : {
            type : 'integer'
        },
        name : {
            type : 'string'
        }
    }
}
const getOneProductItem = {
    schema : {
        tags : ['products'],
        security : [{apiKey : []}],
        params : {
            type : 'object',
            properties : {
                id : {
                    type : 'string',
                    description : 'the id of product'
                }
            }
        },
        response : {
            200 : product
        }
    },
    handler : getOneProduct,
    preHandler : [getUserMiddleware]
}
const getProductItem = {
    schema : {
        tags : ['products'],
        security : [{apiKey : []}],
        response : {
            200 : {
                type : 'object',
                properties : {
                    products : {
                        type : 'array',
                        items : product
                    },
                    user : {
                        type : 'object',
                        properties : {
                            id : {type : "number"},
                            first_name : {type : "string"},
                            last_name : {type : "string"},
                            username : {type : "string"},
                            accessToken : {type : "string"},
                        }
                    }
                }
            }
        }
    },
    handler : getAllProducts,
    preHandler : [getUserMiddleware]
}

export default function productRoutes(fastify, options, done){
    fastify.addHook("onRequest", (request) => request.jwtVerify())
    // get all products
    fastify.get("/", getProductItem);
    // get one product
    fastify.get("/:id", getOneProductItem);
    done();
}