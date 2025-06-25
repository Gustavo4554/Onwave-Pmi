const express = require("express");
const router = express.Router();
const FluxoChatbot = require("../models/FluxoChatbot");

router.get("/:id", async (req, res) => {
  try {
    const fluxo = await FluxoChatbot.findOne({ id: req.params.id });
    if (!fluxo) return res.status(404).json({ erro: "Etapa não encontrada" });
    res.json(fluxo);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar etapa do fluxo" });
  }
});

module.exports = router;
