const { Router } = require("express");
const { Agendamento } = require("../database/agendamento");
const { agendamentoSchema } = require("../database/agendamento");
const Pet = require("../database/pet");
const Servico = require("../database/servico");

const router = Router();

router.post("/agendamentos", async (req, res) => {
    const { dataAgendada, dataRealizada, petId, servicoId } = req.body;
    const { error, value } = agendamentoSchema.validate(req.body);

    if(error) {
        return res.status(400).json({ message: "Erro de validação", error: error.details })
    }
    try {
    const pet = await Pet.findByPk(petId);
    const servico = await Servico.findByPk(servicoId);
    if(pet && servico) {
        const agendamento = await Agendamento.create({
            dataAgendada,
            dataRealizada,
            petId,
            servicoId
        });
        res.status(201).json({ message: "Agendamento feito com sucesso", agendamento });
        } else {
        res.status(404).json({ error: "Pet ou Serviço não encontrados"})
        }
        } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu"})
    }
    })

module.exports = router;