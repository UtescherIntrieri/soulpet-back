const { Router } = require("express");
const { Servico } = require("../database/servico");
const { servicoSchema } = require("../database/servico");

const router = Router();

//Listar todos serviços
router.get("/servicos", async (req, res) =>{
  
  const listaServicos = await Servico.findAll();
  res.json(listaServicos)
  
}) 

//Listar um serviço por id
router.get('/servicos/:id', async (req, res, next) => {
  try {
    const servico = await Servico.findOne({
      where: { id: req.params.id },
    });

    if (!servico) {
      return res.status(404).json({ message: 'Serviço não encontrado.' });
    }

    return res.json(servico);
  } catch (err) {
    console.error(err);
    next(err) 
  }
});

router.post("/servicos", async (req, res, next) => {
  const { nome, preco } = req.body;
  const { error, value } = servicoSchema.validate(req.body);
  
  if(error) {
    return res.status(400).json({ message: "Erro de validação", error: error.details[0].message })
  }

    try {
        const novoServico = await Servico.create({ nome, preco })
        res.status(201).json(novoServico);
    } catch (err) {
      console.error(err);
      next(err) 
    }
  });

//Deletar todos os serviços
router.delete("/servicos/all", async (req, res, next) => {
    try {
      await Servico.destroy({ where: {} });
      res.status(200).json({ message: "Todos os serviços foram removidos!" });
    } catch (err) {
      console.error(err);
      next(err) 
    }
  });

//Deletar serviço por id
router.delete("/servicos/:id", async (req, res, next) => {
    const { id } = req.params;
    
    const servico = await Servico.findOne({ where: { id } });
    try {
      if (servico) {
        await servico.destroy();
        res.status(200).json({ message: "Serviço removido!" });
      } else {
        res.status(404).json({ message: "Serviço não encontrado." });
      }
    } catch (err) {
      console.error(err);
      next(err) 
    }
});


module.exports = router;