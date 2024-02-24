import { DataTypes, Sequelize } from "sequelize"

export const sql = new Sequelize('fancy', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})




export default sql.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
    }
})