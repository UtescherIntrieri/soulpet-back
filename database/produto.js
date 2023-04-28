const { DataTypes } = require("sequelize");
const { connection } = require("./database");

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
   caregoria:{
      type: DataTypes.STRING,
      allowNull: true
   },
 })
    
module.exports = Produto
