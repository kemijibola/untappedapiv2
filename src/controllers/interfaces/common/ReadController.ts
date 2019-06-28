import { RequestHandler } from 'express';

interface ReadController {
  fetch: RequestHandler;
  findById: RequestHandler;
}
export = ReadController;
