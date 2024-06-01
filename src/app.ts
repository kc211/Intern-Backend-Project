import express, { Express } from "express";
import cors from "cors";
import LoginRoute from './routes/LoginRoute'
import RegisterRoute from './routes/RegRoute';
import HomeRoute from './routes/HomeRoute';


const app: Express = express();
const path = require('path');   
app.use(express.json());

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/",HomeRoute);
app.use("/",LoginRoute);
app.use("/",RegisterRoute);
app.use("/",HomeRoute);

app.listen(8081, () => {
  console.log("server is running on PORT 8081");
});
