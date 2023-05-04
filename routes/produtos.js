const { Router } = require("express");
const { Produto, produtoSchema } = require("../database/produto");

const router = Router();

// Listar todos os produtos e filtrar por query
router.get("/produtos", async (req, res) => {
  const { nome, preco, categoria } = req.query;
  const listaProdutos = await Produto.findAll();
  if (nome) {
    const listaNome = await Produto.findAll({ where: { nome: `${nome}` } });
    res.json(listaNome);
  } else if (preco) {
    const listaPreco = await Produto.findAll({ where: { preco: `${preco}` } });
    res.json(listaPreco);
  } else if (categoria) {
    const listaCategoria = await Produto.findAll({ where: { categoria: `${categoria}` } });
    res.json(listaCategoria);
  } else { res.json(listaProdutos); }
});

// Listar produto por id
router.get("/produtos/:id", async (req, res) => {
  const { id } = req.params;

  const produto = await Produto.findByPk(id);
  if (produto) {
    res.json(produto);
  } else {
    res.status(404).json({ message: "Produto não encontrado." });
  }
});

// Adicionar produto
router.post("/produtos", async (req, res) => {
  const { nome, descricao, preco, desconto, dataDesconto, categoria } = req.body
  const categorias = ["Higiene", "Brinquedos", "Conforto"]
  const { error, value } = produtoSchema.validate(req.body);

  if(error) {
    return res.status(400).json({ message: "Erro de validação", error: error.details[0].message })
  }

  try {
    if ((dataDesconto) || (desconto) || (categoria)) {
      if (desconto < 0 || desconto > 100) {
        return res.status(400).json({ message: "Desconto inválido" })
      }
      if (!categorias.includes(categoria)) {
        return res.status(400).json({ message: "Categoria inválida" })
      }
      if (new Date(dataDesconto) < new Date().toISOString) {
        return res.status(400).json({ message: "Desconto vencido" })
      }
      const novoProduto = await Produto.create({ nome, descricao, preco, desconto, dataDesconto, categoria })
      res.status(201).json(novoProduto)
    }
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu" })
  }
})

// Editar produto
router.put("/produtos/:id", async (req, res) => {
  const { nome, descricao, preco, desconto, dataDesconto, categoria } = req.body
  const categorias = ["Higiene", "Brinquedos", "Conforto"]
  const produto = await Produto.findByPk(req.params.id);

  const { error, value } = produtoSchema.validate(req.body);

  if(error) {
    return res.status(400).json({ message: "Erro de validação", error: error.details[0].message })
  }

  try {
    if (produto) {
      if (desconto < 0 || desconto > 100) {
        return res.status(400).json({ message: "Desconto inválido" })
      }
      if (!categorias.includes(categoria)) {
        return res.status(400).json({ message: "Categoria inválida" })
      }
      if (new Date(dataDesconto) < new Date().toISOString) {
        return res.status(400).json({ message: "Desconto vencido" })
      } else {
        await Produto.update(
          { nome, descricao, preco, desconto, dataDesconto, categoria },
          { where: { id: req.params.id } }
        );
        res.json({ message: "O produto foi editado." });
      }
    } else {
      res.status(404).json({ message: "O produto não foi encontrado." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu" })
  }
})

//Deletar todos os produtos da tabela
router.delete("/produtos/all", async (req, res) => {
  try {
    await Produto.destroy({ where: {} });
    res.status(200).json({ message: "Todos os produtos foram removidos." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

//Deletar produto por id
router.delete("/produtos/:id", async (req, res) => {

  const { id } = req.params;

  const produto = await Produto.findOne({ where: { id } });
  try {
    if (produto) {
      await produto.destroy();
      res.status(200).json({ message: "Produto removido." });
    } else {
      res.status(404).json({ message: "Produto não encontrado." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});


module.exports = router;

