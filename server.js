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
// import fastifyExpress from "@fastify/express";
import fastifyMiddie from "@fastify/middie";
import cors from "cors";
import serveStatic from "serve-static";
import * as path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/user.routes.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = 5000;
const main = async() => {
    // middleware config
    // await fastify.register(fastifyExpress);
    await fastify.register(fastifyMiddie);
    // access token and security config
    fastify.register(fastifyBcrypt, {
        saltWorkFactor : 12
    });
    fastify.register(fastifyJwt, {
        secret : "women-life-freedom"
    });
    // swagger config
    fastify.register(fastifySwagger, fastifySwaggerConfig);
    fastify.register(fastifySwaggerUi, fastifySwaggerUiConfig);
    // middleware config
    fastify.use(cors());
    fastify.use((req, res, next) => {
        console.log("Hello middleware!");
        next()
    });
    fastify.use("/", serveStatic(path.join(__dirname, "public")))
    // routes config
    fastify.register(productRoutes, {prefix : "products"});
    fastify.register(authRoutes, {prefix : "auth"});
    fastify.register(userRoutes, {prefix : "user"});
    fastify.register(indexRoutes);
    // listen to port and run
    fastify.listen({port : PORT},
        (err) => {
            if(err) console.log(err.message);
            console.log(`Server run on port ${fastify.server.address().port}`);
        }
    );
}
main();