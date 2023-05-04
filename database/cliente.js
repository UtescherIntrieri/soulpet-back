// Modelo para gerar a tabela de clientes no MySQL
// Mapeamento: cada propriedade vira uma coluna da tabela

// DataTypes = serve para definir qual o tipo da coluna
const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Joi = require("@hapi/joi");

const clienteSchema = Joi.object({
  nome: Joi.string().required().messages({
    'string.empty': 'O campo nome não pode estar vazio',
    'string.base': 'O campo nome deve ser uma string',
  }),               
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br']}}).required().messages({
    'string.empty': 'O campo email não pode estar vazio',
    'string.email': 'O campo email deve ser um endereço de email válido',
    'string.base': 'O campo email deve ser uma string'
  }),
  telefone: Joi.number().integer().min(6).required().messages({
    'number.base': 'O campo telefone deve ser um número',
    'number.empty': 'O campo telefone não pode estar vazio',
    'number.integer': 'O campo telefone deve ser um número inteiro',
    'number.min': 'O campo telefone deve ter no mínimo 6 caracteres'
  }),
  endereco: {
    uf: Joi.string().uppercase().length(2).required().messages({
      'string.empty': 'O campo UF não pode estar vazio',
      'string.length': 'O campo UF deve ter exatamente 2 caracteres',
      'string.base': 'O campo UF deve ser uma string'
    }),
    cidade: Joi.string().required().messages({
      'string.empty': 'O campo cidade não pode estar vazio',
      'string.base': 'O campo cidade deve ser uma string'
    }),
    cep: Joi.string().length(9).required().messages({
      'string.empty': 'O campo cep não pode estar vazio',
      'string.length': 'O campo cep deve ter exatamente 8 caracteres',
      'string.base': 'O campo cep deve ser uma string'
    }),
    rua: Joi.string().required().messages({
      'string.empty': 'O campo rua não pode estar vazio',
      'string.base': 'O campo rua deve ser uma string'
    }),
    numero: Joi.string().required().messages({
      'string.empty': 'O campo numero não pode estar vazio',
      'string.base': 'O campo numero deve ser uma string'
    }),
  }
})

const Cliente = connection.define("cliente", {
  // Configurar a coluna 'nome'
  nome: {
    // nome VARCHAR NOT NULL
    type: DataTypes.STRING(130),
    allowNull: false, // NOT NULL
  },
  email: {
    // email VARCHAR UNIQUE NOT NULL
    type: DataTypes.STRING(130),
    allowNull: false,
    unique: false,
  },
  telefone: {
    // telefone VARCHAR NOT NULL
    type: DataTypes.STRING(130),
    allowNull: false,
  },
});

// Associação 1:1 (One-to-One)
const Endereco = require("./endereco");

// Cliente tem um Endereço
// Endereço ganha uma chave estrangeira (nome do model + Id)
// Chave estrangeira = clienteId
Cliente.hasOne(Endereco, { onDelete: "CASCADE" });
// CASCADE = apagar o cliente, faz o endereço associado ser apagado junto
Endereco.belongsTo(Cliente); // Endereço pertence a um Cliente

module.exports = {
  Cliente,
  clienteSchema
}
