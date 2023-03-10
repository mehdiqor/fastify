export const fastifySwaggerConfig = {
    swagger : {
        info : {
            title : "Fastify Swagger",
            description : "swagger documentaion of my application",
            version : "0.1.0"
        },
        tags : [
            {name : "home"},
            {name : "authentication"},
            {name : "user"},
            {name : "category"},
            {name : "products"},
        ],
        host : "localhost:5000",
        schemes : ['http'],
        consumes : ["application/json", "application/x-www-form-urlencoded"],
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