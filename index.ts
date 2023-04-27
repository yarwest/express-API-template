import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config()
const app = express();

app.use(express.json());

app.get('/health', (req: Request, res: Response) => { res.status(200); res.send(`Healthy ${process.env.SERVICE_NAME}`); });

app.listen(process.env.PORT, () =>
  console.log(`${process.env.SERVICE_NAME} service listening on port ${process.env.PORT}!`),
);
