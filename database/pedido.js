const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const { Cliente } = require("./cliente");
const { Produto } = require("./produto");
const Joi = require("@hapi/joi");

const pedidoSchema = Joi.object({
    codigo: Joi.string().uuid().messages({
        'any.guid': 'O campo código deve ser um UUID válido',
        'string.empty': 'O campo código não pode ser vazio',
        'any.required': 'O campo código é obrigatório',
    }),
    quantidade: Joi.number().integer().required().messages({
        'number.base': 'O campo quantidade deve ser um número',
        'number.empty': 'O campo quantidade não pode estar vazio',
        'number.integer': 'O campo quantidade deve ser um número inteiro',
    }), 
    clienteId: Joi.number().integer().required().messages({
        'number.base': 'O campo clienteId deve ser um número',
        'number.empty': 'O campo clienteId não pode estar vazio',
        'number.integer': 'O campo clienteId deve ser um número inteiro',
    }),
    produtoId: Joi.number().integer().required().messages({
        'number.base': 'O campo produtoId deve ser um número',
        'number.empty': 'O campo produtoId não pode estar vazio',
        'number.integer': 'O campo produtoId deve ser um número inteiro',
    })    
})

const Pedido = connection.define("pedido", {
    codigo: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

Cliente.hasMany(Pedido, { onDelete: "CASCADE" });
Pedido.belongsTo(Cliente);
Produto.hasMany(Pedido);
Pedido.belongsTo(Produto);

module.exports = {
    Pedido,
    pedidoSchema
}