const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Cliente = require("./cliente");
const Produto = require("./produto")

const Pedido = connection.define("pedido", {
    codigo: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    quantidade: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
})

Cliente.hasMany(Pedido, { onDelete: "CASCADE" });
Pedido.belongsTo(Cliente);

module.exports = Pedido;