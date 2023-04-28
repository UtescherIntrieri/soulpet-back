const { Router } = require("express");
const Servico = require("../database/servico");

const router = Router();

//Deletar todos os serviços
router.delete("/servicos/all", async (req, res) => {
    try {
      await Servico.destroy({ where: {} });
      res.status(200).json({ message: "Todos os serviços foram removidos!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Um erro aconteceu." });
    }
  });

//Deletar serviço por id
router.delete("/servicos/:id", async (req, res) => {
   
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
      res.status(500).json({ message: "Um erro aconteceu." });
    }
});



module.exports = router;