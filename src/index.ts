import express, { Request, Response } from "express";
import router from "./routes/routes";
import Database from "./database/index";
import dotenv from "dotenv";
import userController from "./controllers/userControllers/index";
import authController from "./controllers/authControllers";
import bodyParser from "body-parser";
import cors from "cors";
const userC = new userController();
userC.createUser();
userC.getUser("Usuario Teste");

dotenv.config();
const app = express();
const db = new Database();

db.init();
app.use(express.json()); //this is the build in express body-parser   
app.use(cors());
app.use(router); //deixar sempre por ultimo


app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server running on port 3000: http://localhost:3000");
});