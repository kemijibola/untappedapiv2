import express from 'express';
import { Server } from './server/Server';

const app = express();
new Server(app);
