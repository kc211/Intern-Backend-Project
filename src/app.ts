import express, { Express, Request, Response } from "express";
import mysql2, { Connection } from "mysql2";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import cors from "cors";
import knex, { Knex } from "knex";

dotenv.config();

const app: Express = express();
app.use(express.json());

app.use(cors());

const db: Knex = knex({
  client: "mysql2",
  connection: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
  },
});

app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const data = await db("registered_users").select("*").where({
      email: email,
    });
    if (data.length > 0) {
      const user = data[0];
      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (isValidPassword) {
        return res.json("Login Successful");
      }
      return res.status(401).json("Invalid Credentials");
    } else {
      return res.status(404).json("Please Register");
    }
  } catch (err) {
    console.error("An error occurred:", err);
    return res.status(500).json("Login Failed");
  }
});

app.post("/register", async (req: Request, res: Response) => {
  const { name, email, password_, confirm_password, Phone_number } = req.body;
  if (!name || !email || !password_ || !Phone_number) {
    res.status(400).send("Incomplete Data");
  }
  if (password_ !== confirm_password) {
      return res.status(400).json(`Password doesn't match, please check it!!`);
  }
  else{

      try {
          const password = await bcrypt.hash(password_, 12);
          const data = await db("registered_users").insert({
        name,
        email,
        password,
        Phone_number,
      });
      return res.json({message:"Registered Successfully",data});
    } catch (error) {
      console.error("An error occurred:", error);
      return res.json("Registration Failed");
    }
}
});

app.listen(8081, () => {
  console.log("server is running on PORT 8081");
});
