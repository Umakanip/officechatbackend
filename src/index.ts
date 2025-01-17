import express, { Request, Response } from 'express';
//import sequelize from './models';
import sequelize from './models';
 import userRoutes from './routes/userRoutes';
 import cors from 'cors';;

const app = express();
const PORT = 3000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3001', // allow requests from this origin
  optionsSuccessStatus: 200 // some legacy browsers choke on 204
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/api', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

//sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })


