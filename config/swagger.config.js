export const fastifySwaggerConfig = {
    swagger : {
        info : {
            title : "Fastify Swagger",
            description : "swagger documentaion of my application",
            version : "0.1.0"
        },
        tags : [
            {
                name : "products",
                description : "admin can write and user can read products"
            },
            {
                name : "home",
                description : "home page"
            }
        ],
        host : "localhost:5000",
        schemes : ['http'],
        securityDefinitions : {
            apiKey : {
                type : "apiKey",
                in : "header",
                name : "authorization"
            }
        },
        security : [
            {apiKey : []}
        ]
    }
}
export const fastifySwaggerUiConfig = {
    prefix : "swagger",
    exposeRoute : true
}