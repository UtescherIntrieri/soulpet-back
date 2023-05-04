const { Cliente } = require("../database/cliente");
const { clienteSchema } = require("../database/cliente")
const Endereco = require("../database/endereco");

const { Router } = require("express");

// Criar o grupo de rotas (/clientes)
const router = Router();

// Definição de rotas
router.get("/clientes", async (req, res) => {
  // SELECT * FROM clientes;
  const listaClientes = await Cliente.findAll();
  res.json(listaClientes);
});

// /clientes/1, 2
router.get("/clientes/:id", async (req, res) => {
  // SELECT * FROM clientes WHERE id = 1;
  const cliente = await Cliente.findOne({
    where: { id: req.params.id },
    include: [Endereco], // trás junto os dados de endereço
  });

  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).json({ message: "Usuário não encontrado." });
  }
});

//Rota get para mostrar apenas o endereço do cliente

router.get('/clientes/:clienteId/endereco', async (req, res, next) => {
  try {
    const { clienteId } = req.params;

    const endereco = await Endereco.findByPk(clienteId);
    if (!endereco) {
      return res.status(404).json({ mensagem: "Cliente não encontrado." });
    }

    res.json(endereco);
  } catch (error) {
    console.error(err);
    next(err) 
  }
});

router.post("/clientes", async (req, res, next) => {
  // Coletar os dados do req.body
  const { nome, email, telefone, endereco } = req.body;
  const { error, value } = clienteSchema.validate(req.body);

  if(error) {
    return res.status(400).json({ message: "Erro de validação", error: error.details[0].message })
  }

  try {
    // Dentro de 'novo' estará o o objeto criado
    const novo = await Cliente.create(
      { nome, email, telefone, endereco },
      { include: [Endereco] }
    );

    res.status(201).json(novo);
  } catch (err) {
    console.error(err);
    next(err) 
  }
});

// atualizar um cliente
router.put("/clientes/:id", async (req, res, next) => {
  // obter dados do corpo da requisão
  const { nome, email, telefone, endereco } = req.body;
  // obter identificação do cliente pelos parametros da rota
  const { id } = req.params;
  try {
    // buscar cliente pelo id passado
    const cliente = await Cliente.findOne({ where: { id } });
    // validar a existência desse cliente no banco de dados
    if (cliente) {
      // validar a existência desse do endereço passdo no corpo da requisição
      const { error, value } = clienteSchema.validate(req.body);
      if(error) {
        return res.status(400).json({ message: "Erro de validação", error: error.details[0].message })
      }
      if (endereco) {
        await Endereco.update(endereco, { where: { clienteId: id } });
      }
      // atualizar o cliente com nome, email e telefone
      await cliente.update({ nome, email, telefone });
      res.status(200).json({ message: "Cliente editado." });
    } else {
      res.status(404).json({ message: "Cliente não encontrado." });
    }
  } catch (err) {
    console.error(err);
    next(err) 
  }
});

// excluir um cliente
router.delete("/clientes/:id", async (req, res, next) => {
  // obter identificação do cliente pela rota
  const { id } = req.params;
  // buscar cliente por id
  const cliente = await Cliente.findOne({ where: { id } });
  try {
    if (cliente) {
      await cliente.destroy();
      res.status(200).json({ message: "Cliente removido." });
    } else {
      res.status(404).json({ message: "Cliente não encontrado." });
    }
  } catch (err) {
    console.error(err);
    next(err) 
  }
});

module.exports = router;
