import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("postgres://postgres:3023@localhost:5432/fastify");
const DBConecction = async() => {
    await sequelize.authenticate();
    console.log("postgreSQL is connected...");
}
DBConecction();