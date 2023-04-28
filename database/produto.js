const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Produtos =connection.define(
    "produtos",
    new Schema({
        nome: {
            type: DataTypes.STRING,
           allowNull: true
        },
        preco: {
            type: Number,
           allowNull: true
        },
        descricao: {
            type: DataTypes.STRING,
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        desconto: {
            type: Number,
           allowNull: true
        },
        dataDesconto: {
            type: Date,
           allowNull: true
        },
        caregoria:{
            type: DataTypes.STRING,
           allowNull: true
        },
    })
)
    
module.exports = Produtos