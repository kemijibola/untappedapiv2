import express = require('express');

interface ReadController {
  fetch: express.RequestHandler;
  findById: express.RequestHandler;
}
export = ReadController;
