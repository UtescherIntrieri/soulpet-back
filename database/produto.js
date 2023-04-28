const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Produto = connection.define("produto",
    new Schema({
        nome: {
           type: DataTypes.STRING,
           allowNull: false
        },
        preco: {
            type: Number,
           allowNull: false
        },
        descricao: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        desconto: {
           type: Number,
           allowNull: false
        },
        dataDesconto: {
           type: Date,
           allowNull: false
        },
        caregoria:{
           type: DataTypes.STRING,
           allowNull: true
        },
    })
)
    
module.exports = Produto
