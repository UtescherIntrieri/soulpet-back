const { Cliente } = require("../database/cliente");
const { Pet, petSchema } = require("../database/pet");

const { Router } = require("express");

// Criar o grupo de rotas (/pets)
const router = Router();

router.get("/pets", async (req, res) => {
  const listaPets = await Pet.findAll();
  res.json(listaPets);
});

router.get("/pets/:id", async (req, res) => {
  const { id } = req.params;

  const pet = await Pet.findByPk(id);
  if (pet) {
    res.json(pet);
  } else {
    res.status(404).json({ message: "Pet não encontrado." });
  }
});

//Rota Get para listar pets dos Clientes

router.get('/clientes/:clienteId/pets', async (req, res) => {
  const { clienteId } = req.params;

  const cliente = await Cliente.findByPk(clienteId);
  if (!cliente) {
    return res.status(404).json({ mensagem: "Cliente não encontrado." });
  }

  const listaPets = await Pet.findAll({ where: { clienteId } });
  if (listaPets.length === 0) {
    return res.status(404).json({ mensagem: "Este cliente ainda não cadastrou nenhum pet." });
  }

  res.json(listaPets);
});

router.post("/pets", async (req, res, next) => {
  const { nome, tipo, porte, dataNasc, clienteId } = req.body;
  const { error, value } = petSchema.validate(req.body);

  if(error) {
      return res.status(400).json({ message: "Erro de validação", error: error.details[0].message })
  }

  try {
    const cliente = await Cliente.findByPk(clienteId);
    if (cliente) {
      const pet = await Pet.create({ nome, tipo, porte, dataNasc, clienteId });
      res.status(201).json(pet);
    } else {
      res.status(404).json({ message: "Cliente não encontrado." });
    }
  } catch (err) {
    console.error(err);
    next(err) 
  }
});

router.put("/pets/:id", async (req, res, next) => {
  // Esses são os dados que virão no corpo JSON
  const { clienteId, nome, tipo, dataNasc, porte } = req.body;
  const { error } = petSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // É necessário checar a existência do Pet
  // SELECT * FROM pets WHERE id = "req.params.id";
  const pet = await Pet.findByPk(req.params.id);
  const cliente = await Cliente.findByPk(clienteId);

  // se pet é null => não existe o pet com o id
  try {
    if (pet) {
      // IMPORTANTE: Indicar qual o pet a ser atualizado
      // 1º Arg: Dados novos, 2º Arg: Where
      if (cliente) {
        await Pet.update(
          { clienteId, nome, tipo, dataNasc, porte },
          { where: { id: req.params.id } } // WHERE id = "req.params.id"
          );
          // await pet.update({ nome, tipo, dataNasc, porte });
          res.json({ message: "O pet foi editado." });
        } else {
          res.status(404).json({ message: "O cliente não foi encontrado." });
        }
      } else {
         // caso o id seja inválido, a resposta ao cliente será essa
         res.status(404).json({ message: "O pet não foi encontrado." });
       }
    } catch (err) {
        // caso algum erro inesperado, a resposta ao cliente será essa
        console.error(err);
        next(err) 
  }
});

router.delete("/pets/:id", async (req, res, next) => {
  // Precisamos checar se o pet existe antes de apagar
  const pet = await Pet.findByPk(req.params.id);

  try {
    if (pet) {
      // pet existe, podemos apagar
      await pet.destroy();
      res.json({ message: "O pet foi removido." });
    } else {
      res.status(404).json({ message: "O pet não foi encontrado" });
    }
  } catch (err) {
    console.error(err);
    next(err) 
  }
});

module.exports = router;
