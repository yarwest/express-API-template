import express, { type Request, type Response } from 'express';
import serverlessExpress from "@codegenie/serverless-express";
import { config } from './config/env';

const app = express();

process.on('unhandledRejection', (reason) => {
  console.log('unhandled rejection', { err: reason });
});

process.on('uncaughtException', (err) => {
  console.log('uncaught exception', { err });
});

const isLambda = !!process.env.LAMBDA_TASK_ROOT;

app.use(express.json());

app.get('/health', (req: Request, res: Response) => { res.status(200); res.send(`Healthy ${process.env.SERVICE_NAME}`); });

if(!isLambda) {
  const server = app.listen(config.port);

  server.once('listening', () => {
    console.log(`${config.serviceName} server listening`, { port: config.port });
  });

  server.once('error', (err) => {
    console.log('server failed to start', { err });
    throw err;
  });
}
export const handler = isLambda ? serverlessExpress({ app }) : undefined;