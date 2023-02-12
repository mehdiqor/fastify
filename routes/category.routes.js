import { createCategory, getAllCategories, getOneCategory, removeCategory, updateCategory } from "../handler/category.handler.js";
import { getUserMiddleware } from "../utils/get-user.js";

const addCategoryRoute = {
    schema : {
        tags : ['category'],
        security : [{apiKey : []}],
        body : {
            type : 'object',
            properties : {
                name : {
                    type : 'string'
                }
            }
        },
        response : {
            199 : {
                type : "object"
            }
        }
    },
    handler : createCategory,
    preHandler : [getUserMiddleware]
}
const updateCategoryRoute = {
    schema : {
        tags : ['category'],
        security : [{apiKey : []}],
        params : {
            type : "object",
            properties : {
                id : {type : "string"}
            }
        },
        body : {
            type : 'object',
            properties : {
                name : {
                    type : 'string'
                }
            }
        },
        response : {
            199 : {
                type : "object"
            }
        }
    },
    handler : updateCategory,
    preHandler : [getUserMiddleware]
}
const getAllCategoryRoute = {
    schema : {
        tags : ['category'],
        security : [{apiKey : []}],
        response : {
            199 : {
                type : 'object'
            }
        }
    },
    handler : getAllCategories,
    preHandler : [getUserMiddleware]
}
const getOneCategoryRoute = {
    schema : {
        tags : ['category'],
        security : [{apiKey : []}],
        params : {
            type : "object",
            properties : {
                id : {type : "string"}
            }
        },
        response : {
            199 : {
                type : 'object'
            }
        }
    },
    handler : getOneCategory,
    preHandler : [getUserMiddleware]
}
const removeCategoryRoute = {
    schema : {
        tags : ['category'],
        security : [{apiKey : []}],
        params : {
            type : "object",
            properties : {
                id : {type : "string"}
            }
        },
        response : {
            199 : {
                type : 'object'
            }
        }
    },
    handler : removeCategory,
    preHandler : [getUserMiddleware]
}

export default function categoryRoutes(fastify, options, done){
    fastify.post("/create", addCategoryRoute);
    fastify.patch("/update/:id", updateCategoryRoute);
    fastify.get("/list", getAllCategoryRoute);
    fastify.get("/:id", getOneCategoryRoute);
    fastify.delete("/remove/:id", removeCategoryRoute);
    done();
}