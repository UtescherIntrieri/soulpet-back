const Joi = require("@hapi/joi");
const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const { Pet } = require("./pet");
const { Servico } = require("./servico");

const agendamentoSchema = Joi.object({
    dataAgendada: Joi.date().min(new Date().toISOString().split('T')[0]).required().messages({
    'any.required': 'O campo dataAgendada não pode estar vazio',
    'date.min': 'A dataAgendada não pode ser menor que a data atual',
    'date.base': 'O campo dataAgendada deve ser uma data válida',
    }),               
    realizada: Joi.boolean().messages({
        'boolean.base': 'O campo realizada deve ser um valor booleano',
        'any.required': 'O campo realizada não pode estar vazio',
    }),
    petId: Joi.number().integer().required().messages({
        'number.base': 'O campo petId deve ser um número',
        'number.empty': 'O campo petId não pode estar vazio',
        'number.integer': 'O campo petId deve ser um número inteiro',
    }),
    servicoId: Joi.number().integer().required().messages({
        'number.base': 'O campo servicoId deve ser um número',
        'number.empty': 'O campo servicoId não pode estar vazio',
        'number.integer': 'O campo servicoId deve ser um número inteiro',
    })
}).options({ convert: true })


const Agendamento = connection.define("agendamento", {
    dataAgendada: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    realizada: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});


Pet.hasMany(Agendamento);
Servico.hasMany(Agendamento, { onDelete: "CASCADE" });


module.exports = {
    Agendamento,
    agendamentoSchema
}