const express = require("express");
const router = express.Router();
const Pergunta = require("../models/pergunta");

// Rota para buscar perguntas por nome do campeonato
router.get("/:campeonato", async (req, res) => {
  try {
    const perguntas = await Pergunta.findOne({ campeonato_nome: req.params.campeonato });
    if (perguntas) {
      res.json(perguntas);
    } else {
      res.status(404).json({ erro: "Campeonato não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar perguntas" });
  }
});

module.exports = router;
