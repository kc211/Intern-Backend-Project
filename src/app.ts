import express, { Express } from "express";
import cors from "cors";
import LoginRoute from './routes/LoginRoute'
import RegisterRoute from './routes/RegRoute';
import HomeRoute from './routes/HomeRoute';
import MoviesRoute from './routes/MoviesRoute';
import cookieparser from 'cookie-parser';
import billingRoute from './routes/billingRoute';

const app: Express = express();
import path from 'path';   
import SeatRoute from "./routes/SeatRoute";
import refreshTokenRoute from "./routes/refreshTokenRoute";
app.use(express.json());

app.use(cors({
  credentials:true,
  origin:["http://localhost:5173","https://75mm.netlify.app/"]
}));

app.use(cookieparser());


app.use(express.static(path.join(__dirname, 'public'))); //usage of static images 
console.log(__dirname);



app.use("/home",HomeRoute);
app.use("/",LoginRoute);
app.use("/",RegisterRoute);
app.use("/",HomeRoute);
app.use("/",MoviesRoute);
app.use("/",SeatRoute);
app.use("/",billingRoute);
app.use("/",refreshTokenRoute);

app.listen(8081, () => {
  console.log("server is running on PORT 8081");
});
