const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Produto = connection.define("produto", {
   nome: {
      type: DataTypes.STRING,
      allowNull: false
   },
   preco: {
       type: DataTypes.FLOAT,
      allowNull: false
   },
   descricao: {
       type: DataTypes.STRING(150),
       allowNull: false
   },
   desconto: {
      type: DataTypes.FLOAT,
      allowNull: false
   },
   dataDesconto: {
      type: DataTypes.DATEONLY,
      allowNull: false
   },
   categoria:{
      type: DataTypes.STRING,
      allowNull: false
   },
 })

module.exports = Produto
