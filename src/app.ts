import express, { Express } from "express";
import cors from "cors";
import LoginRoute from './routes/LoginRoute'
import RegisterRoute from './routes/RegRoute';
import HomeRoute from './routes/HomeRoute';
import MoviesRoute from './routes/MoviesRoute';


const app: Express = express();
import path from 'path';   
import SeatRoute from "./routes/SeatRoute";
app.use(express.json());

app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); //usage of static images 
console.log(__dirname);
app.use("/",HomeRoute);
app.use("/",LoginRoute);
app.use("/",RegisterRoute);
app.use("/",HomeRoute);
app.use("/",MoviesRoute);
app.use("/",SeatRoute)

app.listen(8081, () => {
  console.log("server is running on PORT 8081");
});
