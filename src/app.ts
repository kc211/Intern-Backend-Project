import express, { Express } from "express";
import cors from "cors";
import LoginRoutes from './routes/LoginRoute'
import RegisterRoute from './routes/RegRoute';

const app: Express = express();
app.use(express.json());

app.use(cors());

app.use("/",LoginRoutes);
app.use("/",RegisterRoute);

app.listen(8081, () => {
  console.log("server is running on PORT 8081");
});
