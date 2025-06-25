const mongoose = require("mongoose");

const CampeonatoSchema = new mongoose.Schema({
  nome: String,
  localizacao: String,
  data_inicio: String,
  data_fim: String,
  categorias: [String],
  premiacao: String,
});

module.exports = mongoose.models.Campeonato || mongoose.model("Campeonato", CampeonatoSchema);
