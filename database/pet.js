const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const { Cliente } = require("./cliente");
const Joi = require("@hapi/joi");

const petSchema = Joi.object({
  nome: Joi.string().required().messages({
    'string.empty': 'O campo nome não pode estar vazio'
  }),               
  tipo: Joi.string().required().messages({
    'string.empty': 'O campo tipo não pode estar vazio',
    'string.base': 'O campo tipo deve ser uma string'
    
  }),
  porte: Joi.string().required().messages({
    'string.empty': 'O campo porte não pode estar vazio',
    'string.base': 'O campo porte deve ser uma string'
  }),
  dataNasc: Joi.date().required().min(1900).max('now').messages({
    'any.required': 'O campo data não pode estar vazio',
    'date.max': 'A data de nascimento não pode ser maior que a data atual',
    'date.base': 'O campo dataNasc deve ser uma data válida',
    'date.min': 'A data de nascimento não pode ser menor que 1900',
}),
  clienteId: Joi.number().integer().required().messages({
    'number.base': 'O campo clienteId deve ser um número',
    'number.empty': 'O campo clienteId não pode estar vazio',
    'number.integer': 'O campo clienteId deve ser um número inteiro',
  })
})

const Pet = connection.define("pet", {
  nome: {
    type: DataTypes.STRING(130),
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  porte: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  dataNasc: {
    type: DataTypes.DATEONLY,
  },
});

// Relacionamento 1:N (Um cliente pode ter N pets)
Cliente.hasMany(Pet, { onDelete: "CASCADE" });
// CASCADE = quando o cliente for deletado, TODOS os pets serão deletados
Pet.belongsTo(Cliente); // Um pet pertece a um cliente

module.exports = {
  Pet,
  petSchema 
}
