import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';



const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 8801;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
