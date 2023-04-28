const { Router } = require("express");
const Agendamento = require("../database/agendamento");

const router = Router();


//Deletar todos os agendamentos
router.delete("/agendamentos/all", async (req, res) => {
    try {
      await Agendamento.destroy({ where: {} });
      res.status(200).json({ message: "Todos os agendamentos foram removidos!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Um erro aconteceu." });
    }
  });

//Deletar agendamento por id
router.delete("/agendamentos/:id", async (req, res) => {
   
    const { id } = req.params;
    
    const agendamento = await Agendamento.findOne({ where: { id } });
    try {
      if (agendamento) {
        await agendamento.destroy();
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