const Joi = require("@hapi/joi");
const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Pet = require("./pet");
const { Servico } = require("./servico");

const agendamentoSchema = Joi.object({
    dataAgendada: Joi.date().min(new Date().toISOString().split('T')[0]).required(),               
    realizado: Joi.boolean(),
    petId: Joi.number().integer().required(),
    servicoId: Joi.number().integer().required(),
}).options({ convert: true })


const Agendamento = connection.define("agendamento", {
    dataAgendada: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    realizado: {
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