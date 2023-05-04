const Joi = require("@hapi/joi");
const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const servicoSchema = Joi.object({
    nome: Joi.string().required().messages({
        'string.empty': 'O campo nome não pode estar vazio',
        'string.base': 'O campo nome deve ser uma string',
    }),              
    preco: Joi.number().precision(2).min(0).max(9999999).required().messages({
        'number.empty': 'O campo preço não pode estar vazio',
        'number.min': 'O campo preço deve ser maior ou igual a 0',
        'number.max': 'O campo preço não pode ser maior que 9999999',
    })
})

const Servico = connection.define("servico", {
    nome : {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
});

module.exports = {
    Servico,
    servicoSchema
}