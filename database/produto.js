const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Pedido = require("./pedido");

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
    
Produto.hasMany(Pedido,)
Pedido.hasMany(Produto,)

module.exports = Produto
