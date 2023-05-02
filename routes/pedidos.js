const Pedido = require("../database/pedido");
const Produto = require("../database/produto");

const { Router } = require("express");

// Criar o grupo de rotas (/pedidos)
const router = Router();

router.get("/pedidos", async (req, res) => {
  const listaPedidos = await Pedido.findAll();
  res.json(listaPedidos);
});

router.get("/pedidos/:id", async (req, res) => {
  const { id } = req.params;

  const pedido = await pedido.findByPk(id);
  if (pedido) {
    res.json(pedido);
  } else {
    res.status(404).json({ message: "pedido não encontrado." });
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
  const {clienteId, pedidoId, produto, } = req.body;

  try {
    const cliente = await Cliente.findByPk(clienteId);
    if (cliente) {
      const pedido = await pedido.create({ clienteId, pedidoId, produto, });
      res.status(201).json(pedido);
    } else {
      res.status(404).json({ message: "Cliente não encontrado." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

router.put("/pedidos/:id", async (req, res) => {
  // Esses são os dados que virão no corpo JSON
  const { produto } = req.body;

  // É necessário checar a existência do pedido
  // SELECT * FROM pedidos WHERE id = "req.params.id";
  const pedido = await pedido.findByPk(req.params.id);

  // se pedido é null => não existe o pedido com o id
  try {
    if (pedido) {
      // IMPORTANTE: Indicar qual o pedido a ser atualizado
      // 1º Arg: Dados novos, 2º Arg: Where
      await pedido.update(
        { produto, pedido, },
        { where: { id: req.params.id } } // WHERE id = "req.params.id"
      );
      res.json({ message: "O pedido foi editado." });
    } else {
      // caso o id seja inválido, a resposta ao cliente será essa
      res.status(404).json({ message: "O pedido não foi encontrado." });
    }
  } catch (err) {
    // caso algum erro inesperado, a resposta ao cliente será essa
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
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