import { createRequire } from "module";
const require = createRequire(import.meta.url);
import productRoutes from "./routes/product.routes.js";
import indexRoutes from "./routes/index.routes.js";
import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
const fastify = Fastify({ logger : true });

fastify.register(fastifySwagger, {
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
});
fastify.register(fastifySwaggerUi, {
    prefix : "swagger",
    exposeRoute : true
});
fastify.register(indexRoutes)
fastify.register(productRoutes, {prefix : "products"})

const PORT = 5000;
const main = async() => {
    try {
        await fastify.listen(PORT);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}
main();