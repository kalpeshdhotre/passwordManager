import express from "express";
import bodyParser from "body-parser";
import { Admin, ClientList, CredentialDB } from "./db/db";
import { router } from "./routes/addClient";
// const { Admin, ClientList, CredentialDB } = require("./db");

const app = express();
// const router = express.Router();
const PORT: number = 3000;

app.use(bodyParser.json());

app.use("/", router);

app.get("/", (req, res) => {
   const username: string = req.body.name;
   // const name = data.json();
   res.send(`Hello ${username} from password manager!`);
});

app.listen(PORT, () => {
   console.log(`Server is running at http://localhost:${PORT}`);
});
