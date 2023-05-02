const Pedido = require("../database/pedido");
const Produto = require("../database/produto");
const Cliente = require("../database/cliente");
const { Router } = require("express");

// Criar o grupo de rotas (/pedidos)
const router = Router();

router.get("/pedidos", async (req, res) => {
  const listaPedidos = await Pedido.findAll({
    include: [Cliente, Produto],
  });
  res.json(listaPedidos);
});

router.get("/pedidos/:codigo", async (req, res) => {
  const { codigo } = req.params;
  
    const pedidoId = await Pedido.findByPk(codigo, {include: [Cliente, Produto]});
    if (pedidoId) {
      res.json(pedidoId);
    } else {
      res.status(404).json({ message: "Pedido não encontrado." });
    }
});

//Rota Get para listar pedidos dos Clientes

router.get('/pedidos/clientes/:id', async (req, res) => {
  const { clienteId } = req.params;

    // Verificar se o cliente existe
  const cliente = await Cliente.findByPk(clienteId);
  if (!cliente) {
    return res.status(404).json({ mensagem: "Cliente não encontrado." });
  }

  const listaPedidos = await pedido.findAll({ where: { clienteId } });
  if (listaPedidos.length === 0) {
    return res.status(404).json({ mensagem: "Este cliente ainda não cadastrou nenhum pedido." });
  }

  res.json(listaPedidos);
});

router.get('/pedidos/produtos/:id', async (req, res) => {
    const { id } = req.params;
  
    // Verificar se o cliente existe
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ mensagem: "Cliente não encontrado." });
    }
  
    // Buscar os pedidos do cliente e incluir os valores dos produtos relacionados
    const listaPedidos = await Pedido.findAll({ 
      where: { clienteId: id },
      include: [{ model: Produto, as: 'produtos' }] // relacionamento entre Pedido e Produto
    });
  
    res.json(listaPedidos);
  });

router.post("/pedidos", async (req, res) => {
  const { codigo, quantidade, clienteId, produtoId, } = req.body;

  try {
    const cliente = await Cliente.findByPk(clienteId);
    const produto = await Produto.findByPk(produtoId);
    if (cliente && produto) {
      const pedido = await Pedido.create({ codigo, quantidade, clienteId, produtoId});
      res.status(201).json(pedido);
    } else {
      res.status(404).json({ message: "Cliente ou Produto não encontrado." });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
})

router.put('/pedidos/:id', async (req, res) => {
  try {
    const pedidoAtualizado = req.body;
    const pedidoId = req.params.id;

    const pedido = await Pedido.findByPk(pedidoId);

    if (!pedido) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    pedido.produto = pedidoAtualizado.produto || pedido.produto;
    pedido.quantidade = pedidoAtualizado.quantidade || pedido.quantidade;
    pedido.valor_unitario = pedidoAtualizado.valor_unitario || pedido.valor_unitario;

    await pedido.save();

    res.status(200).json(pedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar pedido' });
  }
});

router.delete("/pedidos/:id", async (req, res) => {
  // Precisamos checar se o pedido existe antes de apagar
  const pedido = await pedido.findByPk(req.params.id);

  try {
    if (pedido) {
      // pedido existe, podemos apagar
      await pedido.destroy();
      res.json({ message: "O pedido foi removido." });
    } else {
      res.status(404).json({ message: "O pedido não foi encontrado" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

module.exports = router;