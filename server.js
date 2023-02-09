// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
import Fastify from "fastify";
import "./config/sequelize.connection.js";
export const fastify = Fastify({ logger : true });
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import indexRoutes from "./routes/index.routes.js";
import productRoutes from "./routes/product.routes.js";
import { fastifySwaggerConfig, fastifySwaggerUiConfig } from "./config/swagger.config.js";
import authRoutes from "./routes/auth.routes.js";
import fastifyBcrypt from "fastify-bcrypt";
import fastifyJwt from "@fastify/jwt";

fastify.register(fastifyBcrypt, {
    saltWorkFactor : 12
});
fastify.register(fastifyJwt, {
    secret : "women-life-freedom"
});
fastify.register(fastifySwagger, fastifySwaggerConfig);
fastify.register(fastifySwaggerUi, fastifySwaggerUiConfig);
fastify.register(indexRoutes);
fastify.register(productRoutes, {prefix : "products"});
fastify.register(authRoutes, {prefix : "auth"});

const PORT = 5000;
const main = () => {
    fastify.listen({port : PORT},
        (err) => {
            if(err) console.log(err.message);
            console.log(`Server run on port ${fastify.server.address().port}`);
        }
    );
}
main();