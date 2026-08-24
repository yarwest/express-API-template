import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

const envRes = dotenv.config()

if (envRes.error) {
  throw envRes.error;
}

const app = express();

app.use(express.json());

app.get('/health', (req: Request, res: Response) => { res.status(200); res.send(`Healthy ${process.env.SERVICE_NAME}`); });

app.listen(process.env.PORT, () =>
  console.log(`${process.env.SERVICE_NAME} service listening on port ${process.env.PORT}!`),
);
