const express = require("express");
const bodyParser = require("body-parser");
const planilhaRoutes = require("./routes/planilhaRoutes");

const app = express();

app.use(bodyParser.json());
app.use(planilhaRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
