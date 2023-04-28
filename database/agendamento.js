const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Pet = require("./pet");
const Servico = require("./servico");

const Agendamento = connection.define("agendamento", {
    dataAgendada: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    dataRealizada: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
});


Pet.hasMany(Agendamento);
Servico.hasMany(Agendamento, { onDelete: "CASCADE" });


module.exports = Agendamento;