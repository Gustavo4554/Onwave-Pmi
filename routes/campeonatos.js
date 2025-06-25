const express = require("express");
const router = express.Router();
const Campeonato = require("../models/campeonato");

// Rota para pegar todos os campeonatos
router.get("/", async (req, res) => {
  try {
    const campeonatos = await Campeonato.find();
    res.json(campeonatos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar campeonatos" });
  }
});

module.exports = router;
