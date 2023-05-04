const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Joi = require("@hapi/joi");

const categorias = ['Higiene', 'Brinquedos', 'Conforto'];

const produtoSchema = Joi.object({
   nome: Joi.string().required().messages({
      'string.empty': 'O campo nome não pode estar vazio',
      'string.base': 'O campo nome deve ser uma string',
   }), 
   preco: Joi.number().min(0).max(9999999).required().messages({
      'number.empty': 'O campo preço não pode estar vazio',
      'number.min': 'O campo preço deve ser maior ou igual a 0',
      'number.max': 'O campo preço não pode ser maior que 9999999',
   }),
   descricao: Joi.string().required().messages({
      'string.empty': 'O campo descrição não pode estar vazio',
      'string.base': 'O campo descrição deve ser uma string',
   }),
   desconto: Joi.number().min(0).max(100).required().messages({
      'number.empty': 'O campo desconto não pode estar vazio',  
      'number.base': 'O campo desconto deve ser um número', 
      'number.min': 'O campo desconto não pode ser menor que 0',
      'number.max': 'O campo desconto não pode ser maior que 100',
   }),
   dataDesconto: Joi.date().min(new Date().toISOString().split('T')[0]).required().messages({
      'any.required': 'O campo dataDesconto não pode estar vazio',
      'date.min': 'A dataDesconto não pode ser menor que a data atual',
      'date.base': 'O campo dataDesconto deve ser uma data válida', 
}),
   categoria: Joi.string().valid(...categorias).required().messages({
   'string.empty': 'O campo categoria não pode estar vazio',
   'string.base': 'O campo categoria deve ser uma string',
   'any.only': 'O campo categoria deve ser uma das seguintes opções: ' + categorias.join( ', ' ),
}),

})

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

module.exports = {
   Produto,
   produtoSchema
}
