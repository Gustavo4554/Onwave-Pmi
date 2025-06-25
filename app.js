require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => console.log("❌ Erro ao conectar MongoDB:", err));

app.use("/fluxo", require("./routes/fluxo"));
app.use("/campeonatos", require("./routes/campeonatos"));
app.use(express.static("public"));
app.use("/perguntas", require("./routes/perguntas"));
app.use("/interacoes", require("./routes/interacoes"));

app.listen(3000, () => console.log("✅ Servidor rodando: http://localhost:3000"));
