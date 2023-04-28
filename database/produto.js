const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Pedido = require("./pedido");

const Produto = connection.define("produto", {
   nome: {
      type: DataTypes.STRING,
      allowNull: false
   },
   preco: {
       type: DataTypes.INTEGER,
      allowNull: false
   },
   descricao: {
       type: DataTypes.STRING(150),
       allowNull: false
   },
   desconto: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   dataDesconto: {
      type: DataTypes.DATE,
      allowNull: false
   },
   categoria:{
      type: DataTypes.STRING,
      allowNull: true
   },
 })
 
Produto.hasMany(Pedido)
Pedido.hasMany(Produto)

module.exports = Produto
