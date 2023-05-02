const Joi = require("@hapi/joi");
const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const servicoSchema = Joi.object({
    nome: Joi.string().required(),              
    preco: Joi.number().precision(2).max(999999).required(),
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