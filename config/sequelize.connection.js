import { Sequelize } from "sequelize";

// export const sequelize = new Sequelize("postgres://postgres:3023@localhost:5432/fastify");
export const sequelize = new Sequelize("fastify", "postgres", "3023", {
    host : "localhost",
    port : 5432,
    dialect : "postgres"
});
const DBConecction = async() => {
    await sequelize.authenticate();
    console.log("postgreSQL is connected...");
}
DBConecction();