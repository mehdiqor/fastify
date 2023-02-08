import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.connection.js";

export class User extends Model{}
User.init({
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    first_name : {
        type : DataTypes.STRING
    },
    last_name : {
        type : DataTypes.STRING
    },
    username : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    active : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    },
    birthday : {
        type : DataTypes.DATE
    }
}, {
    sequelize,
    name : "user"
});
User.sync({force : true})