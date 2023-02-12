import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.connection.js";

export const Category = sequelize.define("Category", {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    name : {
        type : DataTypes.STRING,
        unique : true
    }
});

// Category.sync({alter : true}).then(() => {
//     console.log("ctegory sync completed");
// })