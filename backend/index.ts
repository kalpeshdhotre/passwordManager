import express from "express";
import bodyParser from "body-parser";
import { User, ClientList, CredentialDB } from "./db/db";
import { clientRouter } from "./routes/clientOps";
import { userRouter } from "./routes/users";
const cors = require("cors");
// const { Admin, ClientList, CredentialDB } = require("./db");

const app = express();
// const router = express.Router();
const PORT: number = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/client", clientRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
   const username: string = req.body.name;
   // const name = data.json();
   res.send(`Hello ${username} from password manager!`);
});

app.listen(PORT, () => {
   console.log(`Server is running at http://localhost:${PORT}`);
});
