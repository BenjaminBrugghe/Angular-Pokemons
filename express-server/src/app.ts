import express from "express";
import router from "./routes/router";
import "dotenv/config";

// Instaces de dépendances
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT;

// Middleware pour les CORS
app.use(cors());

// Pour la persistance des données
app.use(bodyParser.json());

// Middleware pour req.body.xxx
app.use(express.json());

// A chaque fois que j'interroge app.ts, je passerais par le router
app.use("/", router);

// Définition du port
app.listen(port, () => {
  console.log(`~~ Le serveur a démarré sur: http://localhost:${port} ~~`);
});
